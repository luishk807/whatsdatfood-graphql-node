import UserServices from 'services/users.service';
import UserRatingServices from 'services/userRating.services';
import { createPubSub } from '@graphql-yoga/node';
import UserFavoriteServices from 'services/userFavorites.services';
import {
  CreateUserInputArg,
  CreateUserRatingInputArg,
  UserRating,
  UserView,
  User,
  CreateUserFavoritesInputArg,
  UserFavorites,
  UserFavoritesInputArg,
  UserFriendsInputArg,
  UserFriend,
} from 'interfaces/user';
import { validateUserData } from 'middlewares/user';
import { SUBSCRIPTION_EVENTS } from 'constants/graphql';
import {
  buildUserEntry,
  buildUserFavoritesEntry,
  buildUserRatingEntry,
  buildUserFriendsEntry,
} from 'helpers/users.sequelize';
import DataLoader from 'dataloader';
import { DateTimeResolver } from 'graphql-scalars';
import { ID } from 'types';
import { _get } from 'helpers';
import UserFriendServices from 'services/userFriends.services';
import UserViewsServices from 'services/userViews.services';
import { RestaurantMenuItem } from 'interfaces/restaurant';

type Events = {
  USER_ADDED: { userAdded: User }; // Use your actual UserType here
};

const pubsub = createPubSub();

export const userResolvers = {
  DateTime: DateTimeResolver,
  Query: {
    users: async () => await UserServices.getAll(),
    ratings: async () => await UserRatingServices.getAll(),
    userDetail: async (_: any, args: any, context: { user: User }) => {
      const { user } = context;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const userId = _get(user, 'id');
      return await UserServices.findById(userId);
    },
    getUserSearches: async (
      _: any,
      args: { page?: number; limit?: number },
    ) => {
      const { page, limit } = args;
    },
    getUserSearchesByUser: async (
      _: any,
      args: { page?: number; limit?: number },
      context: { user: User },
    ) => {
      const { user } = context;
      const { page, limit } = args;

      const userId = _get(user, 'id');
    },
    getUserViewsByUser: async (
      _: any,
      args: { page?: number; limit?: number },
      context: { user: User },
    ) => {
      const { page, limit } = args;
      const { user } = context;
      const userId = _get(user, 'id');
      if (!userId) {
        throw new Error('User not authenticated');
      }
      return await UserViewsServices.getAllByUser(userId, page, limit);
    },
    getUserViewsByRestaurant: async (
      _: any,
      args: { restId: ID; page?: number; limit?: number },
    ) => {
      const { restId, page, limit } = args;
      if (!restId) {
        throw new Error('User not authenticated');
      }
      return await UserViewsServices.getAllByRestaurantId(
        Number(restId),
        page,
        limit,
      );
    },
    getUserFavoritesByUser: async (
      _: any,
      args: { page?: number; limit?: number },
      context: { user: User },
    ) => {
      const { user } = context;
      const { page, limit } = args;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const userId = _get(user, 'id');
      return await UserFavoriteServices.getAllByUserId(userId, page, limit);
    },
    getUserByEmail: async (_: any, args: { email: string }) => {
      return await UserServices.findByEmail(args.email);
    },
    getUserByUsername: async (_: any, args: { username: string }) => {
      return await UserServices.findByUsername(args.username);
    },
    getFriendsByUser: async (
      _: any,
      args: { page?: number; limit?: number },
      context: {
        user: DataLoader<string, User>;
      },
    ) => {
      const { page, limit } = args;
      const { user } = context;
      const userId = _get(user, 'id');
      if (!userId) {
        throw new Error('User not authenticated');
      }
      return await UserFriendServices.getAllByUserId(userId, page, limit);
    },
    checkUsername: async (
      _: any,
      args: { username: string },
    ): Promise<Boolean> => {
      const resp = await UserServices.findByUsername(args.username);
      return !!resp;
    },
    checkUserFavoriteBySlug: async (
      _: any,
      args: { slug: string },
      context: {
        user: User;
      },
    ) => {
      console.log('got in checkUserFavoriteBySlug');
      const { slug } = args;
      const { user } = context;

      const userId = _get(user, 'id');
      return await UserFavoriteServices.checkIsFavorite(slug as string, userId);
    },
    getRatingsByUser: async (
      _: any,
      args: { page: number; limit?: number },
      context: { user: User },
    ) => {
      const { limit, page } = args;
      const { user } = context;

      const userId = _get(user, 'id');

      if (!userId) {
        throw new Error('User not authenticated');
      }
      return await UserRatingServices.getAllByUserId(userId, page, limit);
    },
    getRatingByRestItemId: async (
      _: any,
      args: { restItemId: ID },
      context: {
        user: User;
      },
    ) => {
      const { restItemId } = args;
      const { user } = context;
      if (user && restItemId) {
        return await UserRatingServices.findByUserAndRestItemId(
          Number(user.id),
          Number(restItemId),
        );
      }

      return null;
    },
  },
  User: {
    status: async (parent: User) => parent.status,
    views: async (parent: User) => parent.views,
    role: async (parent: User) => parent.role,
    ratings: async (parent: User) => parent.ratings,
    favorites: async (parent: User) => parent.favorites,
    friends: async (parent: User) => parent.friends,
  },
  RestaurantMenuItem: {
    images: async (parent: RestaurantMenuItem) => parent.images,
    ratings: async (parent: RestaurantMenuItem) => parent.ratings,
    restaurant: async (parent: RestaurantMenuItem) => parent.restaurant,
  },
  UserRating: {
    restaurantMenuItem: async (parent: UserRating) => parent.restaurantMenuItem,
    user: async (parent: UserRating) => parent.user,
    status: async (parent: UserRating) => parent.status,
  },
  UserView: {
    restaurant: async (parent: UserView) => parent.restaurant,
    user: async (parent: UserView) => parent.user,
  },
  UserFavorites: {
    user: async (parent: UserFavorites) => parent.user,
    restaurant: async (parent: UserFavorites) => parent.restaurant,
  },
  UserFriends: {
    user: async (parent: UserFriend) => parent.user,
  },
  Mutation: {
    addUser: validateUserData(
      async (
        _parent: any,
        args: CreateUserInputArg,
        context: any,
      ): Promise<User> => {
        if (!context.user) {
          //check authtenthication
        }
        const { input } = args;
        console.log(input);
        const payload = await buildUserEntry(input);
        const resp = await UserServices.create(payload);

        // publish the event
        pubsub.publish(SUBSCRIPTION_EVENTS.USER_ADDED, { userAdded: resp });

        return resp;
      },
    ),
    addUserFriend: async (
      _parent: any,
      args: UserFriendsInputArg,
      context: {
        user: User;
      },
    ): Promise<User> => {
      const { user } = context;
      const userId = _get(user, 'id');
      if (!userId) {
        throw new Error('User not authenticated');
      }
      const { input } = args;

      const payload = await buildUserFavoritesEntry(input);
      return await UserFriendServices.create(payload);
    },
    updateUser: async (_: any, args: CreateUserInputArg): Promise<User> => {
      const { input } = args;
      const payload = await buildUserEntry(input);
      return await UserServices.update(payload);
    },
    updateUserFriend: async (
      _: any,
      args: UserFriendsInputArg,
    ): Promise<UserFriend> => {
      const { input } = args;
      const payload = buildUserFriendsEntry(input);
      return await UserFriendServices.update(payload);
    },
    addUserFavorites: async (
      _: any,
      args: CreateUserFavoritesInputArg,
      context: { user: User },
    ) => {
      const { slug } = args.input;
      const { user } = context;

      if (!slug || !user) {
        throw new Error('user is not log in or slug is missing');
      }

      const userId = _get(user, 'id');
      if (slug) {
        return await UserFavoriteServices.createOrUpdateFavorite(
          slug as string,
          userId,
        );
      }
    },
    deleteUserFavorites: async (_: any, args: UserFavoritesInputArg) => {
      const { input } = args;
      const payload = await buildUserFavoritesEntry(input);
      return await UserFavoriteServices.deleteById(payload);
    },
    updateUserRating: async (
      _: any,
      args: CreateUserRatingInputArg,
    ): Promise<UserRating> => {
      const { input } = args;
      const payload = buildUserRatingEntry(input);
      return await UserRatingServices.update(payload);
    },
    deleteUserRating: async (_: any, args: { id: number }) => {
      return await UserRatingServices.deleteById(args.id);
    },
    deleteUserFriend: async (_: any, args: { id: number }) => {
      return await UserFriendServices.deleteById(args.id);
    },
    addUserRating: async (
      _: any,
      args: CreateUserRatingInputArg,
    ): Promise<UserRating> => {
      const { input } = args;
      const validatedInput = buildUserRatingEntry(input);
      return await UserRatingServices.createOrUpdate(validatedInput);
    },
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.subscribe(SUBSCRIPTION_EVENTS.USER_ADDED),
    },
  },
};

import UserServices from 'services/users.service';
import UserRatingServices from 'services/userRating.services';
import { createPubSub } from '@graphql-yoga/node';
import UserFavoriteServices from 'services/userFavorites.services';
import {
  CreateUserInputArg,
  CreateUserRatingInputArg,
  UserRating,
  UserSearch,
  User,
  CreateUserFavoritesInputArg,
  UserFavorites,
  UserFavoritesInputArg,
} from 'interfaces/user';
import { validateUserData } from 'middlewares/user';
import { SUBSCRIPTION_EVENTS } from 'constants/graphql';
import {
  buildUserEntry,
  buildUserFavoritesEntry,
  buildUserRatingEntry,
} from 'helpers/users.sequelize';
import { DateTimeResolver } from 'graphql-scalars';
import RestaurantServices from 'services/restaurants.service';
import { ID } from 'types';
import { _get } from 'helpers';

type Events = {
  USER_ADDED: { userAdded: User }; // Use your actual UserType here
};

const pubsub = createPubSub();

export const userResolvers = {
  DateTime: DateTimeResolver,
  Query: {
    users: async () => await UserServices.getAll(),
    ratings: async () => await UserRatingServices.getAll(),
    getUserByEmail: async (_: any, args: { email: string }) => {
      return await UserServices.findByEmail(args.email);
    },
    getUserByUsername: async (_: any, args: { username: string }) => {
      return await UserServices.findByUsername(args.username);
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
    allRatingsByItemId: async (
      _: any,
      args: { restItemId: number; page: number },
    ) => {
      const { restItemId, page } = args;
      return await UserRatingServices.getAllByRestItemId(restItemId, page);
    },
    getRatingByRestItemId: async (
      _: any,
      args: { restItemId: ID },
      context: {
        user: User;
      },
    ): Promise<UserRating | null> => {
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
    searches: async (parent: User) => parent.searches,
    role: async (parent: User) => parent.role,
    ratings: async (parent: User) => parent.ratings,
    favorites: async (parent: User) => parent.favorites,
  },
  UserRating: {
    restaurantMenuItem: async (parent: UserRating) => parent.restaurantMenuItem,
    user: async (parent: UserRating) => parent.user,
    status: async (parent: UserRating) => parent.status,
  },
  UserSearch: {
    restaurant: async (parent: UserSearch) => parent.restaurant,
    user: async (parent: UserSearch) => parent.user,
  },
  UserFavorites: {
    user: async (parent: UserFavorites) => parent.user,
    restaurant: async (parent: UserFavorites) => parent.restaurant,
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
    updateUser: async (_: any, args: CreateUserInputArg): Promise<User> => {
      const { input } = args;
      const payload = await buildUserEntry(input);
      return await UserServices.update(payload);
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

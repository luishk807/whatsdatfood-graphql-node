import UserServices from 'services/users.service';
import UserRatingServices from 'services/userRating.services';
import { createPubSub } from '@graphql-yoga/node';
import {
  CreateUserInputArg,
  CreateUserRatingInputArg,
  UserRatingResponse,
  UserSearchesResponse,
  UserResponse,
  UserRatingBase,
} from 'interfaces/user';
import { validateUserData } from 'middlewares/user';
import { SUBSCRIPTION_EVENTS } from 'constants/graphql';
import { dbAliases } from 'db';
import { getAssociationData } from 'helpers/sequelize';
import { buildUserEntry, buildUserRatingEntry } from 'helpers/users.sequelize';
import { RestaurantsInput } from 'db/models/restaurants';
import { DateTimeResolver } from 'graphql-scalars';
type Events = {
  USER_ADDED: { userAdded: UserResponse }; // Use your actual UserType here
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
  },
  User: {
    userStatus: async (parent: UserResponse) => {
      return getAssociationData(
        parent,
        dbAliases.users.status as keyof UserResponse,
      );
    },
    userUserSearches: async (parent: UserResponse) => {
      const value = getAssociationData(
        parent,
        dbAliases.users.userSearches as keyof UserResponse,
      );

      return Array.isArray(value) ? value : [];
    },
    userUserRole: async (parent: UserResponse) => {
      return getAssociationData(
        parent,
        dbAliases.users.userRole as keyof UserResponse,
      );
    },
    userUserRatings: async (parent: UserResponse) => {
      const value = getAssociationData(
        parent,
        dbAliases.users.userRatings as keyof UserResponse,
      );

      return Array.isArray(value) ? value : [];
    },
  },
  UserRatings: {
    userRatingRestaurantItem: async (parent: UserResponse) => {
      const value = getAssociationData(
        parent,
        dbAliases.userRatings.restaurantItem as keyof UserResponse,
      );

      return value;
    },
  },
  UserRatingResponseType: {
    restaurantItem: async (parent: UserResponse) => {
      const value = getAssociationData(
        parent,
        dbAliases.users.userRatings as keyof UserResponse,
      );

      return Array.isArray(value) ? value : [];
    },
  },
  UserSearches: {
    userSearchesRestaurant: async (parent: UserSearchesResponse) => {
      return getAssociationData(
        parent,
        dbAliases.userSearches.restaurant as keyof UserSearchesResponse,
      );
    },
    userSearchesUser: async (parent: UserSearchesResponse) => {
      return getAssociationData(
        parent,
        dbAliases.userSearches.user as keyof UserSearchesResponse,
      );
    },
  },
  Mutation: {
    addUser: validateUserData(
      async (
        _parent: any,
        args: CreateUserInputArg,
        context: any,
      ): Promise<UserResponse> => {
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
    updateUserRating: async (
      _: any,
      args: CreateUserRatingInputArg,
    ): Promise<UserRatingResponse> => {
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
    ): Promise<UserRatingResponse> => {
      const { input } = args;
      const validatedInput = buildUserRatingEntry(input);
      return await UserRatingServices.create(validatedInput);
    },
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.subscribe(SUBSCRIPTION_EVENTS.USER_ADDED),
    },
  },
};

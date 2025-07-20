import UserServices from 'services/users.service';
import UserRatingServices from 'services/userRating.services';
import { createPubSub } from '@graphql-yoga/node';
import {
  createUserInputTypeArgInput,
  createUserRatingInput,
  updateUserRatingInput,
  UserRating,
  UserSearchesType,
  UserType,
} from 'types';
import { validateUserData } from 'middlewares/user';
import { SUBSCRIPTION_EVENTS } from 'constants/graphql';
import { dbAliases } from 'db';
import { getAssociationData } from 'helpers/sequelize';
import { DateTimeResolver } from 'graphql-scalars';
type Events = {
  USER_ADDED: { userAdded: UserType }; // Use your actual UserType here
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
    userStatus: async (parent: UserType) => {
      return getAssociationData(
        parent,
        dbAliases.users.status as keyof UserType,
      );
    },
    userUserSearches: async (parent: UserType) => {
      const value = getAssociationData(
        parent,
        dbAliases.users.userSearches as keyof UserType,
      );

      return Array.isArray(value) ? value : [];
    },
    userUserRole: async (parent: UserType) => {
      return getAssociationData(
        parent,
        dbAliases.users.userRole as keyof UserType,
      );
    },
    userUserRatings: async (parent: UserType) => {
      const value = getAssociationData(
        parent,
        dbAliases.users.userRatings as keyof UserType,
      );

      return Array.isArray(value) ? value : [];
    },
  },
  UserRatings: {
    userRatingRestaurantItem: async (parent: UserRating) => {
      const value = getAssociationData(
        parent,
        dbAliases.userRatings.restaurantItem as keyof UserRating,
      );

      return value;
    },
  },
  UserSearches: {
    userSearchesRestaurant: async (parent: UserSearchesType) => {
      return getAssociationData(
        parent,
        dbAliases.userSearches.restaurant as keyof UserSearchesType,
      );
    },
    userSearchesUser: async (parent: UserSearchesType) => {
      return getAssociationData(
        parent,
        dbAliases.userSearches.user as keyof UserSearchesType,
      );
    },
  },
  Mutation: {
    addUser: validateUserData(
      async (
        _parent: any,
        args: createUserInputTypeArgInput,
        context: any,
      ): Promise<UserType> => {
        if (!context.user) {
          //check authtenthication
        }
        const { input } = args;
        console.log(input);
        const resp = await UserServices.create(input);

        // publish the event
        pubsub.publish(SUBSCRIPTION_EVENTS.USER_ADDED, { userAdded: resp });

        return resp;
      },
    ),
    updateUserRating: async (
      _: any,
      args: { input: updateUserRatingInput },
    ): Promise<UserRating> => {
      const { input } = args;
      return await UserRatingServices.update(input);
    },
    deleteUserRating: async (_: any, args: { id: number }) => {
      return await UserRatingServices.deleteById(args.id);
    },
    addUserRating: async (
      _: any,
      args: { input: createUserRatingInput },
    ): Promise<UserRating> => {
      const { input } = args;
      return await UserRatingServices.create(input);
    },
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.subscribe(SUBSCRIPTION_EVENTS.USER_ADDED),
    },
  },
};

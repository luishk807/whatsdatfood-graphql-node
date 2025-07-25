import UserServices from 'services/users.service';
import UserRatingServices from 'services/userRating.services';
import { createPubSub } from '@graphql-yoga/node';
import {
  CreateUserInputArg,
  CreateUserRatingInputArg,
  UserRating,
  UserSearch,
  User,
} from 'interfaces/user';
import { validateUserData } from 'middlewares/user';
import { SUBSCRIPTION_EVENTS } from 'constants/graphql';
import { buildUserEntry, buildUserRatingEntry } from 'helpers/users.sequelize';
import { DateTimeResolver } from 'graphql-scalars';
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
  },
  User: {
    status: async (parent: User) => parent.status,
    searches: async (parent: User) => parent.searches,
    role: async (parent: User) => parent.role,
    ratings: async (parent: User) => parent.ratings,
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
      return await UserRatingServices.create(validatedInput);
    },
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.subscribe(SUBSCRIPTION_EVENTS.USER_ADDED),
    },
  },
};

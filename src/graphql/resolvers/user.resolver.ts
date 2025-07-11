import UserServices from 'services/users.service';
import { createPubSub } from '@graphql-yoga/node';
import { createUserInputTypeArgInput, RestaurantType, UserType } from 'types';
import { validateUserData } from 'middlewares/user';

type Events = {
  USER_ADDED: { userAdded: UserType }; // Use your actual UserType here
};

const pubsub = createPubSub();

const USER_ADDED = 'USER_ADDED';

export const userResolvers = {
  Query: {
    users: async () => await UserServices.getAll(),
  },
  User: {
    searches: async (parent: UserType) => {
      return [];
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
        pubsub.publish('USER_ADDED', { userAdded: resp });

        return resp;
      },
    ),
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.subscribe('USER_ADDED'),
    },
  },
};

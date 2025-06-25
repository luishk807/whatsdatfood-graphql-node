import UserServices from 'services/users.service';
import RestaurantServices from 'services/restaurants.service';
import { createUserInputTypeArgInput, RestaurantType, UserType } from 'types';
import { UserSearchesType } from 'types';

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
    addUser: async (_parent: any, args: createUserInputTypeArgInput) => {
      const { input } = args;
      return await UserServices.create(input);
    },
  },
};

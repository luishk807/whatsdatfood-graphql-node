import UserServices from '../../services/users.service';
import RestaurantServices from '../../services/restaurants.service';
import { createUserInputType, RestaurantType, UserType } from '../../types';
import { UserSearchesType } from '../../types';

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
    addUser: async (_parent: any, arg: createUserInputType) => {
      return await UserServices.create(arg);
    },
  },
};

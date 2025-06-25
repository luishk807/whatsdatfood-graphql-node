import UserServices from 'services/users.service';
import { createUserInputTypeArgInput, RestaurantType, UserType } from 'types';
import { validateUserData } from 'middlewares/user';
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
      ): Promise<UserType> => {
        const { input } = args;
        console.log(input);
        return await UserServices.create(input);
      },
    ),
  },
};

import UserServices from '../../services/users.service';
import { UserInput } from '../../db/models/users';

export const userResolvers = {
  Query: {
    users: async () => await UserServices.getAll(),
  },
  Mutation: {
    addUser: async (_parent: any, arg: UserInput) => {
      return await UserServices.create(arg);
    },
  },
};

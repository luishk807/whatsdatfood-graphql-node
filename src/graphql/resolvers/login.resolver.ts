import loginService from 'services/login.service';
import { LoginPayload } from 'types';
export const loginResolvers = {
  Mutation: {
    login: async (
      _: any,
      args: { username: string; password: string },
    ): Promise<LoginPayload> => {
      const { username, password } = args;
      return await loginService.login(username, password);
    },
  },
};

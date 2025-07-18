import loginService from 'services/login.service';
import { LoginPayload } from 'types';
import { serialize } from 'cookie';
export const loginResolvers = {
  Query: {
    checkAuth: (_: any, __: any, context: any) => {
      return context.user;
    },
  },
  Mutation: {
    login: async (
      _: any,
      args: { username: string; password: string },
      context: any,
    ): Promise<LoginPayload> => {
      const { res } = context;
      const { username, password } = args;
      const loginResult = await loginService.login(username, password);

      if (loginResult.success) {
        const token = loginResult.token;

        res.setHeader(
          'Set-Cookie',
          serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60,
          }),
        );
      }

      return { success: loginResult.success };
    },
  },
};

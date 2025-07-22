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
    logout: async (_: any, __: any, context: any): Promise<LoginPayload> => {
      const { res } = context;

      try {
        res.setHeader(
          'Set-Cookie',
          serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(0), // Invalidate immediately
            path: '/',
          }),
        );

        return { success: true };
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }

        return { success: false };
      }
    },
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
        console.log('token length:', token.length); // <-- add this
        res.setHeader(
          'Set-Cookie',
          serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production' ? false : true,
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

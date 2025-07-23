import { ApolloError } from 'apollo-server-errors';
import { createUserInputTypeArgInput } from 'interfaces/user';
import validator from 'validator';

import { _get } from 'helpers';
import dayjs from 'dayjs';
export const validateUserData =
  <TArgs = any, TContext = any, TResult = any>(
    resolver: (
      parent: any,
      args: createUserInputTypeArgInput,
      context: TContext,
      info: any,
    ) => Promise<TResult>,
  ) =>
  async (
    parent: any,
    args: createUserInputTypeArgInput,
    context: TContext,
    info: any,
  ): Promise<TResult> => {
    const dob = _get(args, 'input.dob');
    const email = _get(args, 'input.email');
    const last_name = _get(args, 'input.last_name');
    const first_name = _get(args, 'input.first_name');
    const password = _get(args, 'input.password');

    if (!last_name || !first_name || !password) {
      throw new ApolloError(
        'first name or last name or password is missing',
        'BAD_USER_INPUT',
      ); // prefer 400, not 500
    }

    // Example validation: check if it's a valid ISO date
    if (!dob || !dayjs(dob).isValid()) {
      throw new ApolloError('Invalid date of birth', 'BAD_USER_INPUT'); // prefer 400, not 500
    }

    if (!email || !validator.isEmail(email)) {
      throw new ApolloError('Invalid email', 'BAD_USER_INPUT');
    }

    return resolver(parent, args, context, info);
  };

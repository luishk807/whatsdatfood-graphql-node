import { _get } from '.';
import { UserInput } from 'db/models/users';
import { createHashPassword } from 'helpers';

export const buildUserPayload = async (item: UserInput) => {
  const password = await createHashPassword(_get(item, 'password'));

  return {
    first_name: _get(item, 'first_name'),
    last_name: _get(item, 'last_name'),
    password: password,
    phone: _get(item, 'phone'),
    email: _get(item, 'email'),
    dob: _get(item, 'dob'),
  };
};

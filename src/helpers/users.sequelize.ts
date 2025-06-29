import { _get } from '.';
import { UserInput } from 'db/models/users';
import { createHashPassword } from 'helpers/login';
import { USER_ROLE_DEFAULT } from 'constants/sequelize';
export const buildUserPayload = async (item: UserInput) => {
  const password = await createHashPassword(_get(item, 'password'));
  const role = _get(item, 'role');
  return {
    first_name: _get(item, 'first_name'),
    last_name: _get(item, 'last_name'),
    password: password,
    role: role ? role : USER_ROLE_DEFAULT,
    phone: _get(item, 'phone'),
    email: _get(item, 'email'),
    dob: _get(item, 'dob'),
  };
};

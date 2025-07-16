import { _get } from '.';
import { UserInput } from 'db/models/users';
import { UserRatingsInput } from 'db/models/userRatings';
import { createHashPassword } from 'helpers/login';
import { UserRating } from 'types';
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

export const buildUserRatingPayload = async (item: UserRatingsInput) => {
  const id = _get(item, 'id');
  let payload: UserRating = {
    rating: parseFloat(_get(item, 'rating')),
    user_id: _get(item, 'user_id'),
    restaurant_menu_item_id: _get(item, 'restaurant_menu_item_id'),
  };

  if (id !== undefined && id !== null) {
    payload.id = Number(id);
  }

  return payload;
};

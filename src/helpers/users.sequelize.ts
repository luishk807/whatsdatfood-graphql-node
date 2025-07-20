import { _get } from '.';
import { UserInput } from 'db/models/users';
import { UserRatingsInput } from 'db/models/userRatings';
import { createHashPassword } from 'helpers/login';
import { UserRating, UserType } from 'types/user';
import { USER_ROLE_DEFAULT } from 'constants/sequelize';
import { dbAliases } from 'db';
export const buildUserPayload = async (item: UserInput) => {
  const password = await createHashPassword(_get(item, 'password'));
  const role = _get(item, 'role_id');
  return {
    first_name: _get(item, 'first_name'),
    last_name: _get(item, 'last_name'),
    username: _get(item, 'username'),
    password: password,
    role_id: role ? role : USER_ROLE_DEFAULT,
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
    comment: _get(item, 'comment'),
    restaurant_menu_item_id: _get(item, 'restaurant_menu_item_id'),
  };

  if (id !== undefined && id !== null) {
    payload.id = Number(id);
  }

  return payload;
};

export const buildUserResponse = (item: UserType | UserType[]) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: UserType) => ({
        id: _get(data, 'id'),
        first_name: _get(data, 'first_name'),
        last_name: _get(data, 'last_name'),
        password: _get(data, 'password'),
        phone: _get(data, 'phone'),
        email: _get(data, 'email'),
        username: _get(data, 'username'),
        verification: _get(data, 'verification'),
        status_id: _get(data, 'status_id'),
        role_id: _get(data, 'role_id'),
        createdAt: _get(data, 'createdAt'),
        updatedAt: _get(data, 'updatedAt'),
        dob: _get(data, 'dob'),
        searches: _get(data, dbAliases.users.userSearches),
        ratings: _get(data, dbAliases.users.userRatings),
        status: _get(data, dbAliases.users.status),
        role: _get(data, dbAliases.users.userRole),
      }))
    : {
        id: _get(item, 'id'),
        first_name: _get(item, 'first_name'),
        last_name: _get(item, 'last_name'),
        password: _get(item, 'password'),
        phone: _get(item, 'phone'),
        email: _get(item, 'email'),
        username: _get(item, 'username'),
        verification: _get(item, 'verification'),
        status_id: _get(item, 'status_id'),
        role_id: _get(item, 'role_id'),
        createdAt: _get(item, 'createdAt'),
        updatedAt: _get(item, 'updatedAt'),
        dob: _get(item, 'dob'),
        searches: _get(item, dbAliases.users.userSearches),
        ratings: _get(item, dbAliases.users.userRatings),
        status: _get(item, dbAliases.users.status),
        role: _get(item, dbAliases.users.userRole),
      };
};

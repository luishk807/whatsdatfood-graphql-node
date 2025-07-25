import { _get } from '.';
import { createHashPassword } from 'helpers/login';
import { UserRating, User, UserInput, UserRatingInput } from 'interfaces/user';
import { USER_ROLE_DEFAULT, DEFAULT_STATUS } from 'constants/sequelize';
import { dbAliases } from 'db';
export const buildUserEntry = async (item: UserInput) => {
  if (!item.first_name || !item.last_name || typeof item.email !== 'string') {
    throw new Error(
      'Missing required fields: restaurant_menu_item_id, user_id, rating',
    );
  }
  const password = await createHashPassword(_get(item, 'password'));
  const role = _get(item, 'role_id');
  return {
    first_name: String(_get(item, 'first_name')),
    last_name: _get(item, 'last_name'),
    username: _get(item, 'username'),
    password: password,
    role_id: role ? role : USER_ROLE_DEFAULT,
    phone: _get(item, 'phone'),
    email: _get(item, 'email'),
    dob: _get(item, 'dob'),
  };
};

export const buildUserRatingEntry = (input: UserRatingInput) => {
  if (
    !input.restaurant_menu_item_id ||
    !input.user_id ||
    typeof input.rating !== 'number'
  ) {
    throw new Error(
      'Missing required fields: restaurant_menu_item_id, user_id, rating',
    );
  }
  const id = _get(input, 'id');
  return {
    ...(id && { id: id }),
    restaurant_menu_item_id: BigInt(input.restaurant_menu_item_id),
    user_id: BigInt(input.user_id),
    rating: input.rating,
    title: input.title,
    comment: input.comment,
  };
};

export const buildUserRatingResponse = async (
  item: UserRating | UserRating[],
) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  if (Array.isArray(item)) {
    const test = item[0];
    console.log('test', test);
  }

  return Array.isArray(item)
    ? item.map((data: any) => ({
        id: _get(data, 'id'),
        rating: parseFloat(_get(data, 'rating')),
        user_id: _get(data, 'user_id'),
        comment: _get(data, 'comment'),
        title: _get(data, 'title'),
        status_id: _get(data, 'status_id'),
        restaurant_menu_item_id: _get(data, 'restaurant_menu_item_id'),
        restaurantMenuItem: _get(data, dbAliases.userRatings.restaurantItem),
        status: _get(data, dbAliases.userRatings.status),
        user: _get(data, dbAliases.userRatings.user),
      }))
    : {
        id: _get(item, 'id'),
        rating: parseFloat(_get(item, 'rating')),
        user_id: _get(item, 'user_id'),
        comment: _get(item, 'comment'),
        title: _get(item, 'title'),
        status_id: _get(item, 'status_id'),
        restaurant_menu_item_id: _get(item, 'restaurant_menu_item_id'),
        restaurantMenuItem: _get(item, dbAliases.userRatings.restaurantItem),
        status: _get(item, dbAliases.userRatings.status),
        user: _get(item, dbAliases.userRatings.user),
      };
};

export const buildUserResponse = (item: User | User[]) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: User) => ({
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

import { _get } from '.';
import { createHashPassword } from 'helpers/login';
import {
  UserRating,
  User,
  UserInput,
  UserRatingInput,
  UserFavorites,
  UserFavoritesInput,
  UserFriend,
  UserFriendsInput,
  UserSearchInput,
  UserSearch,
} from 'interfaces/user';
import { USER_ROLE_DEFAULT, DEFAULT_STATUS } from 'constants/sequelize';
import { getRestaurantItemResponse } from 'helpers/restaurants.sequelize';
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

export const buildUserSearchEntry = async (item: UserSearchInput) => {
  if (!item.user_id || !item.restaurant_id || !item.user_search_type_id) {
    throw new Error(
      'Missing required fields: user_id, restaurant_id, user_search_type_id',
    );
  }
  const id = _get(item, 'id');
  return {
    ...(id && { id: id }),
    restaurant_id: _get(item, 'restaurant_id'),
    user_id: _get(item, 'user_id'),
    user_search_type_id: _get(item, 'user_search_type_id'),
  };
};

export const buildUserFavoritesEntry = (input: UserFavoritesInput) => {
  if (!input.restaurant_id || !input.user_id) {
    throw new Error(
      'Missing required fields: restaurant_menu_item_id, user_id, rating',
    );
  }
  const id = _get(input, 'id');
  return {
    ...(id && { id: id }),
    restaurant_id: BigInt(input.restaurant_id),
    user_id: BigInt(input.user_id),
  };
};

export const buildUserFriendsEntry = (input: UserFriendsInput) => {
  if (!input.user_id || !input.user_id) {
    throw new Error('Missing required fields: user_id, user_id, name');
  }
  const id = _get(input, 'id');
  return {
    ...(id && { id: id }),
    phone: _get(input, 'phone'),
    email: _get(input, 'email'),
    name: _get(input, 'name'),
    user_id: BigInt(input.user_id),
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

  return Array.isArray(item)
    ? item.map((data: any) => getUserRatingResponse(data))
    : getUserRatingResponse(item);
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
        rating: _get(data, dbAliases.users.userFavorites),
        friends: _get(data, dbAliases.users.friends),
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
        rating: _get(item, dbAliases.users.userFavorites),
        friends: _get(item, dbAliases.users.friends),
      };
};

export const buildUserSearchResponse = (item: UserSearch | UserSearch[]) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: UserSearch) => ({
        id: _get(data, 'id'),
        restaurant_id: _get(data, 'restaurant_id'),
        user_id: _get(data, 'user_id'),
        user_search_type_id: _get(data, 'user_search_type_id'),
        createdAt: _get(data, 'createdAt'),
        updatedAt: _get(data, 'updatedAt'),
        user: _get(data, dbAliases.userFavorites.user),
        restaurant: _get(data, dbAliases.userFavorites.restaurant),
        searchType: _get(data, dbAliases.userSearches.userSearchTypes),
      }))
    : {
        id: _get(item, 'id'),
        restaurant_id: _get(item, 'restaurant_id'),
        user_id: _get(item, 'user_id'),
        user_search_type_id: _get(item, 'user_search_type_id'),
        createdAt: _get(item, 'createdAt'),
        updatedAt: _get(item, 'updatedAt'),
        user: _get(item, dbAliases.userSearches.user),
        restaurant: _get(item, dbAliases.userSearches.restaurant),
        searchType: _get(item, dbAliases.userSearches.userSearchTypes),
      };
};

export const buildUserFavoritesResponse = (
  item: UserFavorites | UserFavorites[],
) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: UserFavorites) => ({
        id: _get(data, 'id'),
        restaurant_id: _get(data, 'restaurant_id'),
        user_id: _get(data, 'user_id'),
        createdAt: _get(data, 'createdAt'),
        updatedAt: _get(data, 'updatedAt'),
        user: _get(data, dbAliases.userFavorites.user),
        restaurant: _get(data, dbAliases.userFavorites.restaurant),
      }))
    : {
        id: _get(item, 'id'),
        restaurant_id: _get(item, 'restaurant_id'),
        user_id: _get(item, 'user_id'),
        createdAt: _get(item, 'createdAt'),
        updatedAt: _get(item, 'updatedAt'),
        user: _get(item, dbAliases.userFavorites.user),
        restaurant: _get(item, dbAliases.userFavorites.restaurant),
      };
};

export const buildUserFriendsResponse = (item: UserFriend | UserFriend[]) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: UserFriend) => ({
        id: _get(data, 'id'),
        name: _get(data, 'name'),
        email: _get(data, 'email'),
        phone: _get(data, 'phone'),
        user_id: _get(data, 'user_id'),
        createdAt: _get(data, 'createdAt'),
        updatedAt: _get(data, 'updatedAt'),
        user: _get(data, dbAliases.userFriends.user),
      }))
    : {
        id: _get(item, 'id'),
        name: _get(item, 'name'),
        email: _get(item, 'email'),
        phone: _get(item, 'phone'),
        user_id: _get(item, 'user_id'),
        createdAt: _get(item, 'createdAt'),
        updatedAt: _get(item, 'updatedAt'),
        user: _get(item, dbAliases.userFavorites.user),
      };
};

export const getUserRatingResponse = (data: UserRating) => {
  const restaurantItems = _get(data, dbAliases.userRatings.restaurantItem);

  const formatItems = getRestaurantItemResponse(
    restaurantItems,
    dbAliases.restaurantItems.restaurant,
    dbAliases.restaurantItems.restaurantItemImages,
    dbAliases.restaurantItems.userRatings,
  );

  return {
    id: _get(data, 'id'),
    rating: parseFloat(_get(data, 'rating')),
    user_id: _get(data, 'user_id'),
    comment: _get(data, 'comment'),
    title: _get(data, 'title'),
    status_id: _get(data, 'status_id'),
    restaurant_menu_item_id: _get(data, 'restaurant_menu_item_id'),
    restaurantMenuItem: formatItems,
    createdAt: _get(data, 'createdAt'),
    updatedAt: _get(data, 'updatedAt'),
    status: _get(data, dbAliases.userRatings.status),
    user: _get(data, dbAliases.userRatings.user),
  };
};

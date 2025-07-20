import { StatusType } from 'types';
import {
  RestaurantItemType,
  RestaurantItemResponseType,
  RestaurantType,
  RestaurantResponseType,
} from 'types/restaurant';

export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  phone: string;
  email: string;
  role_id: bigint;
  verification: string;
  dob?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  status_id?: number;
  userUserRatings?: [UserRating];
  userStatus?: StatusType;
  userUserRole?: UserRoleType;
  userUserSearches?: [UserSearchesType];
};

export type UserResponseType = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  phone: string;
  email: string;
  role_id: bigint;
  verification: string;
  dob?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  status_id?: number;
  ratings?: [UserRatingResponseType];
  status?: StatusType;
  role?: UserRoleType;
  searches?: [UserSearchesType];
};

export type UserRating = {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: string;
  userRatingRestaurantItem?: RestaurantItemType;
};

export type UserRatingResponseType = {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: string;
  restaurantItem?: RestaurantItemResponseType;
};

export type UserRoleType = {
  id: number;
  name: string;
};

export type UserSearchesType = {
  id: number;
  user_id: number;
  restaurant_id: number;
  userSearchesRestaurant: RestaurantType;
  userSearchesUser: UserType;
};

export type UserSearchesResponseType = {
  id: number;
  user_id: number;
  restaurant_id: number;
  restaurant: RestaurantResponseType;
  user: UserResponseType;
};

export type createUserRatingInput = {
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  comment?: string;
};

export type updateUserRatingInput = {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
};

export type createUserInputType = {
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  phone: string;
  role_id: bigint;
  email: string;
  verification: string;
  dob: Date;
};

export type createUserRoleInputType = {
  name: string;
};

export type createUserRoleInputTypeArgInput = {
  input: createUserRoleInputType;
};

export type createUserInputTypeArgInput = {
  input: createUserInputType;
};

export type createUserSearchesInputType = {
  id: number;
  user_id: number;
  restaurant_id: number;
};

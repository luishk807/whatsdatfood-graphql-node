import {
  RestaurantItemType,
  RestaurantItemResponseType,
  RestaurantType,
  RestaurantResponseType,
} from 'interfaces/restaurant';

import { StatusType } from 'interfaces';

export interface UserType {
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
}

export interface UserResponseType {
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
}

export interface UserRating {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  comment?: string;
  userRatingRestaurantItem?: RestaurantItemType;
}

export interface UserRatingResponseType {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  comment?: string;
  restaurantItem?: RestaurantItemResponseType;
}

export interface UserRoleType {
  id: number;
  name: string;
}

export interface UserSearchesType {
  id: number;
  user_id: number;
  restaurant_id: number;
  userSearchesRestaurant: RestaurantType;
  userSearchesUser: UserType;
}

export interface UserSearchesResponseType {
  id: number;
  user_id: number;
  restaurant_id: number;
  restaurant: RestaurantResponseType;
  user: UserResponseType;
}

export interface createUserRatingInput {
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  comment?: string;
  title?: string;
}

export interface updateUserRatingInput {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  comment?: string;
  title?: string;
}

export interface createUserInputType {
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  phone: string;
  role_id: bigint;
  email: string;
  verification: string;
  dob: Date;
}

export interface createUserRoleInputType {
  name: string;
}

export interface createUserRoleInputTypeArgInput {
  input: createUserRoleInputType;
}

export interface createUserInputTypeArgInput {
  input: createUserInputType;
}

export interface createUserSearchesInputType {
  id: number;
  user_id: number;
  restaurant_id: number;
}

export interface UserType {
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
}

export interface UserResponseType {
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
}

export interface UserRating {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  comment?: string;
  userRatingRestaurantItem?: RestaurantItemType;
}

export interface UserRatingResponseType {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  comment?: string;
  restaurantItem?: RestaurantItemResponseType;
}

export interface UserRoleType {
  id: number;
  name: string;
}

export interface UserSearchesType {
  id: number;
  user_id: number;
  restaurant_id: number;
  userSearchesRestaurant: RestaurantType;
  userSearchesUser: UserType;
}

export interface UserSearchesResponseType {
  id: number;
  user_id: number;
  restaurant_id: number;
  restaurant: RestaurantResponseType;
  user: UserResponseType;
}

export interface createUserRatingInput {
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  comment?: string;
  title?: string;
}

export interface updateUserRatingInput {
  id?: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  rating: number;
  comment?: string;
  title?: string;
}

export interface createUserInputType {
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  phone: string;
  role_id: bigint;
  email: string;
  verification: string;
  dob: Date;
}

export interface createUserRoleInputType {
  name: string;
}

export interface createUserRoleInputTypeArgInput {
  input: createUserRoleInputType;
}

export interface createUserInputTypeArgInput {
  input: createUserInputType;
}

export interface createUserSearchesInputType {
  id: number;
  user_id: number;
  restaurant_id: number;
}

import {
  RestaurantItemResponse,
  RestaurantResponse,
} from 'interfaces/restaurant';
import { ID } from 'types';
import { Status } from 'interfaces';

export interface UserRoleBase {
  id?: ID;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserBase {
  id?: ID;
  first_name?: string;
  last_name?: string;
  password?: string;
  username?: string;
  phone?: string;
  email?: string;
  role_id?: ID;
  verification?: string;
  dob?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  status_id?: ID;
}
export interface UserSearchesBase {
  id?: ID;
  user_id: ID;
  restaurant_id: ID;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserRatingBase {
  id?: ID;
  restaurant_menu_item_id: ID;
  user_id: ID;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  comment?: string;
}

export interface UserResponse extends UserBase {
  ratings?: UserRatingResponse[];
  status?: Status;
  role?: UserRoleResponse;
  searches?: UserSearchesResponse[];
}

export interface UserRatingResponse extends UserRatingBase {
  restaurantItem?: RestaurantItemResponse;
}

export interface UserRoleResponse {
  id: ID;
  name: string;
}
export interface UserSearchesResponse extends UserSearchesBase {
  restaurant: RestaurantResponse;
  user: UserResponse;
}

export interface UserRatingInput
  extends Partial<Omit<UserRatingBase, 'id' | 'createdAt' | 'updatedAt'>> {}

export interface UserInput
  extends Partial<Omit<UserBase, 'id' | 'createdAt' | 'updatedAt'>> {}

export interface UserSearchesInput
  extends Partial<Omit<UserSearchesBase, 'id' | 'createdAt' | 'updatedAt'>> {}
export interface UserRoleInput
  extends Partial<Omit<UserRoleBase, 'id' | 'createdAt' | 'updatedAt'>> {}
export interface CreateUserRoleInputArg {
  input: UserRoleInput;
}
export interface CreateUserRatingInputArg {
  input: UserRatingInput;
}
export interface CreateUserInputArg {
  input: UserInput;
}
export interface CreateUserSearchInputArg {
  input: UserSearchesInput;
}

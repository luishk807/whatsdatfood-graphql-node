import { RestaurantMenuItem, Restaurant } from 'interfaces/restaurant';
import { ID } from 'types';
import { Status } from 'interfaces';

export interface UserRoleBase {
  id?: ID;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserFavoritesBase {
  id?: ID;
  user_id: ID;
  restaurant_id: ID;
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
  status_id?: ID;
  updatedAt?: Date;
  title?: string;
  comment?: string;
}

export interface UserFavorites extends Partial<UserFavoritesBase> {
  user?: User;
  restaurant?: Restaurant;
}

export interface User extends Partial<UserBase> {
  ratings?: UserRating[];
  status?: Status;
  role?: UserRole;
  searches?: UserSearch[];
  favorites?: UserFavorites[];
}

export interface UserRating extends Partial<UserRatingBase> {
  restaurantMenuItem?: RestaurantMenuItem;
  user?: User;
  status?: Status;
}

export interface UserRole {
  id: ID;
  name: string;
}
export interface UserSearch extends Partial<UserSearchesBase> {
  restaurant?: Restaurant;
  user?: User;
  status?: Status;
}

export interface UserRatingInput
  extends Partial<Omit<UserRatingBase, 'id' | 'createdAt' | 'updatedAt'>> {}
export interface UserFavoritesInput
  extends Partial<Omit<UserFavoritesBase, 'id' | 'createdAt' | 'updatedAt'>> {}

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

export interface CreateUserFavoritesInputArg {
  input: UserFavoritesInput;
}

import { UserRating, User } from 'interfaces/user';
import { ID } from 'types';
export interface RestaurantMenuItemImagesBase {
  id?: ID;
  restaurant_item_id: ID;
  user_id?: bigint;
  name: string;
  url_m: string;
  url_s: string;
  owner: string;
  license: string;
  content_link: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface RestaurantMenuItemBase {
  id?: ID;
  name: string;
  category: string;
  price?: number;
  top_choice?: boolean;
  description: string;
  restaurant_id?: ID;
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantBase {
  id?: ID;
  name?: string;
  slug?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  payment_method?: string;
  rating?: number;
  michelin_score?: number;
  description?: string;
  delivery_method?: string;
  letter_grade?: string;
  email?: string;
  reservation_required?: boolean;
  reservation_available?: boolean;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantMenuItemImages extends RestaurantMenuItemImagesBase {
  restaurantMenuItem: RestaurantMenuItem;
}

export interface RestaurantMenuItem extends RestaurantMenuItemBase {
  restaurant?: Restaurant;
  images?: RestaurantMenuItemImages[];
  ratings?: UserRating[];
}
export interface Restaurant extends RestaurantBase {
  restaurantMenuItems?: RestaurantMenuItem[];
}

export interface CreateRestaurantMenuItemInput
  extends Partial<
    Omit<RestaurantMenuItemBase, 'id' | 'createdAt' | 'updatedAt'>
  > {}
export interface CreateRestaurantInput
  extends Partial<Omit<RestaurantBase, 'id' | 'createdAt' | 'updatedAt'>> {}

export interface CreateRestaurantArgInput {
  input: CreateRestaurantInput;
}
export interface CreateRestarauntMenuItemArgInput {
  input: CreateRestaurantMenuItemInput;
}
export interface RestaurantMenuItemsAI extends Partial<RestaurantMenuItemBase> {
  ratings?: UserRating[];
  images?: RestaurantMenuItemImages[];
  restaurant?: Restaurant;
}

export interface RestaurantAI extends Partial<RestaurantBase> {
  restaurantMenuItems?: RestaurantMenuItemsAI[];
}

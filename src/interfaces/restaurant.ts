import { UserRatingResponse } from 'interfaces/user';
import { ID } from 'types';
export interface RestaurantMenuImageBase {
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

export interface RestaurantItemBase {
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
  name: string;
  slug?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
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
export interface RestaurantMenuItemImagesResponse
  extends RestaurantMenuImageBase {
  restaurantItem: RestaurantItemResponse;
}

export interface RestaurantItemResponse extends RestaurantItemBase {
  restaurant?: RestaurantResponse;
  images?: RestaurantMenuItemImagesResponse[];
  ratings?: UserRatingResponse[];
}
export interface RestaurantResponse extends RestaurantBase {
  restaurantItems?: RestaurantItemResponse[];
}

export interface CreateRestaurantItemInput
  extends Partial<Omit<RestaurantItemBase, 'id' | 'createdAt' | 'updatedAt'>> {}
export interface CreateRestaurantInput
  extends Partial<Omit<RestaurantBase, 'id' | 'createdAt' | 'updatedAt'>> {}

export interface CreateRestaurantArgInput {
  input: CreateRestaurantInput;
}
export interface CreateRestarauntItemArgInput {
  input: CreateRestaurantItemInput;
}
export interface RestaurantMenuItemsAIResponse extends RestaurantItemBase {
  ratings?: UserRatingResponse[];
  images?: RestaurantMenuItemImagesResponse[];
}

export interface RestaurantAIResponse extends RestaurantBase {
  restaurantItems?: RestaurantMenuItemsAIResponse[];
}

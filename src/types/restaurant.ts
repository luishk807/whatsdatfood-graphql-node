import { UserRating, UserRatingResponseType } from 'types/user';

export type RestaurantMenuItemImages = {
  id: number;
  restaurant_item_id: number;
  user_id?: bigint;
  name: string;
  url_m: string;
  url_s: string;
  owner: string;
  license: string;
  content_link: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  restaurantItemImageRestItem: RestaurantItemType;
};
export type RestaurantMenuItemImagesResponseType = {
  id: number;
  restaurant_item_id: number;
  user_id?: bigint;
  name: string;
  url_m: string;
  url_s: string;
  owner: string;
  license: string;
  content_link: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  restaurantItem: RestaurantItemResponseType;
};

export type RestaurantItemType = {
  id?: number;
  name: string;
  category: string;
  price?: number;
  top_choice?: boolean;
  restaurant_id?: number;
  createdAt?: string;
  updatedAt?: string;
  description: string;
  restaurantItemRest?: RestaurantType;
  restaurantItemRestImages?: [RestaurantMenuItemImages];
  restaurantItemUserRatings?: [UserRating];
};

export type RestaurantItemResponseType = {
  id?: number;
  name: string;
  category: string;
  price?: number;
  top_choice?: boolean;
  description: string;
  restaurant_id?: number;
  createdAt?: string;
  updatedAt?: string;
  restaurant?: RestaurantResponseType;
  images?: [RestaurantMenuItemImagesResponseType];
  ratings?: [UserRatingResponseType];
};

export type RestaurantType = {
  id: number;
  name: string;
  slug: string;
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
  createdAt?: string;
  updatedAt?: string;
  restRestaurantItems?: [RestaurantItemType];
};

export type RestaurantResponseType = {
  id: number;
  name: string;
  slug: string;
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
  createdAt?: string;
  updatedAt?: string;
  restaurantItems?: [RestaurantItemResponseType];
};

export type createRestaurantInput = {
  name: string;
  slug: string;
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
};

export type createRestaurantArgInput = {
  input: createRestaurantInput;
};

export type RestaurantMenuItemsAIResponse = {
  name: string;
  description: string;
  top_choice?: boolean;
  price?: number;
  category: string;
  restaurant_id?: number;
  ratings?: [UserRatingResponseType];
  images?: [RestaurantMenuItemImagesResponseType];
};

export type RestaurantAIResponse = {
  id?: number;
  name: string;
  address: string;
  city: string;
  slug: string;
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
  restaurantItems?: [RestaurantMenuItemsAIResponse];
};

export type addressType = {
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
};

export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  email: string;
  role: number;
  verification: string;
  dob: Date;
};

export type UserRoleType = {
  id: number;
  name: string;
};

export type UserSearchesType = {
  id: number;
  user_id: number;
  restaurant_id: number;
};

export type RestaurantMenuItemImages = {
  id: number;
  restaurant_item_id: number;
  name: string;
  url_m: string;
  url_s: string;
  owner: String;
  license: String;
  flickr_id: String;
  category: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  restaurantItemImageRestItem: RestaurantItemType;
};

export type RestaurantItemType = {
  id?: number;
  name: string;
  category: string;
  price?: number;
  top_choice?: boolean;
  description: string;
  restaurant_id?: number;
  created_at?: string;
  updated_at?: string;
  restaurantItemRest?: RestaurantType;
  restaurantItemRestImages?: [RestaurantMenuItemImages];
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
  created_at: string;
  updated_at: string;
  restRestaurantItems: [RestaurantItemType];
};

export type createRestaurantInput = {
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

export type createRestaurantArgInput = {
  input: createRestaurantInput;
};

export type createUserInputType = {
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  role: number;
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

export type RestaurantMenuItemsAIResponse = {
  name: string;
  description: string;
  top_choice?: boolean;
  price?: number;
  category: string;
  restaurant_id?: number;
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
  restRestaurantItems?: [RestaurantMenuItemsAIResponse];
};

export type getBuiltAddressType = (address: addressType) => string;

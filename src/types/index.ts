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
  verification: string;
  dob: Date;
};

export type UserSearchesType = {
  id: number;
  user_id: number;
  restaurant_id: number;
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
};

export type createRestaurantInput = {
  name: string;
  slug: Text;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

export type createUserInputType = {
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  email: string;
  verification: string;
  dob: Date;
};

export type createUserSearchesInputType = {
  id: number;
  user_id: number;
  restaurant_id: number;
};

export type RestaurantItemType = {
  id: number;
  name: string;
  category: string;
  restaurant_id: number;
  created_at: string;
  updated_at: string;
};

export type getBuiltAddressType = (address: addressType) => string;

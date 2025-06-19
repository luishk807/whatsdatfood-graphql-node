export type UserType = {
  name: string;
};

export type addressType = {
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
};

export type getBuiltAddressType = (address: addressType) => string;

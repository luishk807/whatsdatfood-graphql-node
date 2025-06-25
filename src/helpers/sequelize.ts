import { _get } from '.';
import { RestaurantsInput } from 'db/models/restaurants';
import { getSlug, getBuiltAddress } from '.';

export const getPageOffset = (limit: number, pageNumber: number) => {
  return limit * (pageNumber - 1);
};

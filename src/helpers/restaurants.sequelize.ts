import { _get } from '.';
import { RestaurantsInput } from 'db/models/restaurants';
import { RestaurantMenuItemsInput } from 'db/models/restaurantMenuItems';
import { getSlug, getBuiltAddress } from '.';

export const buildRestaurantPayload = (item: RestaurantsInput) => {
  const address_data = {
    address: _get(item, 'address'),
    city: _get(item, 'city'),
    state: _get(item, 'state'),
    country: _get(item, 'country'),
    postal_code: _get(item, 'postal_code'),
  };

  const full_address = getBuiltAddress({
    ...address_data,
  });
  const slug = getSlug(`${_get(item, 'name')} ${full_address}`);
  return {
    name: _get(item, 'name'),
    slug,
    ...address_data,
  };
};
export const buildRestaurantItemPayload = (item: RestaurantMenuItemsInput) => {
  return {
    name: _get(item, 'name'),
    category: _get(item, 'category'),
    description: _get(item, 'description'),
    restaurant_id: _get(item, 'restaurant_id'),
  };
};

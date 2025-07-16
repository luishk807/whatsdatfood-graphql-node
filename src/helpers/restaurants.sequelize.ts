import { _get } from '.';
import { convertStringToNumber } from 'helpers';
import { RestaurantsInput } from 'db/models/restaurants';
import { RestaurantMenuItemsInput } from 'db/models/restaurantMenuItems';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';
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
  let priceRaw = _get(item, 'price');
  let price = convertStringToNumber(priceRaw);
  return {
    name: _get(item, 'name'),
    top_choice: _get(item, 'top_choice'),
    category: _get(item, 'category'),
    price: price,
    description: _get(item, 'description'),
    restaurant_id: _get(item, 'restaurant_id'),
  };
};

export const buildRestaurantItemImagePayload = (
  item: RestaurantMenuItemImagesInput,
) => {
  return {
    name: _get(item, 'name'),
    license: _get(item, 'license'),
    owner: _get(item, 'owner'),
    url_m: _get(item, 'url_m'),
    content_link: _get(item, 'content_link'),
    url_s: _get(item, 'url_s'),
    restaurant_menu_item_id: _get(item, 'restaurant_menu_item_id'),
  };
};

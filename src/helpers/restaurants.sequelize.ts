import { _get } from '.';
import { convertStringToNumber } from 'helpers';
import { RestaurantsInput } from 'db/models/restaurants';
import { RestaurantMenuItemsInput } from 'db/models/restaurantMenuItems';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';
import { getSlug, getBuiltAddress } from '.';
import { RestaurantMenuItem, Restaurant } from 'interfaces/restaurant';
import { dbAliases } from 'db';

export const buildRestaurantPayload = (item: RestaurantsInput) => {
  const address_data = {
    address: _get(item, 'address'),
    city: _get(item, 'city'),
    state: _get(item, 'state'),
    country: _get(item, 'country'),
    postal_code: _get(item, 'postal_code'),
    phone: _get(item, 'phone'),
    payment_method: _get(item, 'payment_method'),
    rating: _get(item, 'rating'),
    michelin_score: _get(item, 'michelin_score'),
    description: _get(item, 'description'),
    delivery_method: _get(item, 'delivery_method'),
    letter_grade: _get(item, 'letter_grade'),
    email: _get(item, 'email'),
    reservation_required: _get(item, 'reservation_required'),
    reservation_available: _get(item, 'reservation_available'),
    website: _get(item, 'website'),
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

export const buildRestaurantResponse = (item: Restaurant | Restaurant[]) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: Restaurant) => {
        return getRestaurantResponse(data);
      })
    : getRestaurantResponse(item);
};

export const buildRestaurantItemResponse = (
  item: RestaurantMenuItem | RestaurantMenuItem[],
) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: RestaurantMenuItem) => {
        return getRestaurantItemResponse(data);
      })
    : getRestaurantItemResponse(item);
};

export const getRestaurantItemResponse = (data: RestaurantMenuItem) => {
  return {
    id: _get(data, 'id'),
    restaurant_id: _get(data, 'restaurant_id'),
    name: _get(data, 'name'),
    price: _get(data, 'price'),
    top_choice: _get(data, 'top_choice'),
    description: _get(data, 'description'),
    category: _get(data, 'category'),
    createdAt: _get(data, 'createdAt'),
    updatedAt: _get(data, 'updatedAt'),
    deletedAt: _get(data, 'deletedAt'),
    restaurant: _get(data, dbAliases.restaurantItems.restaurant),
    images: _get(data, dbAliases.restaurantItems.restaurantItemImages),
    ratings: _get(data, dbAliases.restaurantItems.userRatings),
  };
};

export const getRestaurantResponse = (data: Restaurant) => {
  return {
    id: _get(data, 'id'),
    name: _get(data, 'name'),
    slug: _get(data, 'slug'),
    address: _get(data, 'address'),
    city: _get(data, 'city'),
    state: _get(data, 'state'),
    country: _get(data, 'country'),
    postal_code: _get(data, 'postal_code'),
    createdAt: _get(data, 'createdAt'),
    updatedAt: _get(data, 'updatedAt'),
    phone: _get(data, 'phone'),
    payment_method: _get(data, 'payment_method'),
    rating: _get(data, 'rating'),
    michelin_score: _get(data, 'michelin_score'),
    description: _get(data, 'description'),
    delivery_method: _get(data, 'delivery_method'),
    letter_grade: _get(data, 'letter_grade'),
    email: _get(data, 'email'),
    reservation_required: _get(data, 'reservation_required'),
    reservation_available: _get(data, 'reservation_available'),
    website: _get(data, 'website'),
    restaurantMenuItems: _get(data, dbAliases.restaurant.restaurantItems),
  };
};

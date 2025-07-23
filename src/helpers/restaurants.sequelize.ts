import { _get } from '.';
import { convertStringToNumber } from 'helpers';
import { RestaurantsInput } from 'db/models/restaurants';
import { RestaurantMenuItemsInput } from 'db/models/restaurantMenuItems';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';
import { getSlug, getBuiltAddress } from '.';
import { RestaurantItemType, RestaurantType } from 'interfaces/restaurant';
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

export const buildRestaurantResponse = (
  item: RestaurantType | RestaurantType[],
) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: RestaurantType) => ({
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
        restaurantItems: _get(data, dbAliases.restaurant.restaurantItems),
      }))
    : {
        id: _get(item, 'id'),
        name: _get(item, 'name'),
        slug: _get(item, 'slug'),
        address: _get(item, 'address'),
        city: _get(item, 'city'),
        state: _get(item, 'state'),
        country: _get(item, 'country'),
        postal_code: _get(item, 'postal_code'),
        createdAt: _get(item, 'createdAt'),
        updatedAt: _get(item, 'updatedAt'),
        phone: _get(item, 'phone'),
        payment_method: _get(item, 'payment_method'),
        rating: _get(item, 'rating'),
        michelin_score: _get(item, 'michelin_score'),
        description: _get(item, 'description'),
        delivery_method: _get(item, 'delivery_method'),
        letter_grade: _get(item, 'letter_grade'),
        restaurantItems: _get(item, dbAliases.restaurant.restaurantItems),
      };
};

export const buildRestaurantItemResponse = (
  item: RestaurantItemType | RestaurantItemType[],
) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return item;
  }

  return Array.isArray(item)
    ? item.map((data: RestaurantItemType) => ({
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
      }))
    : {
        id: _get(item, 'id'),
        restaurant_id: _get(item, 'restaurant_id'),
        name: _get(item, 'name'),
        price: _get(item, 'price'),
        top_choice: _get(item, 'top_choice'),
        description: _get(item, 'description'),
        category: _get(item, 'category'),
        createdAt: _get(item, 'createdAt'),
        updatedAt: _get(item, 'updatedAt'),
        deletedAt: _get(item, 'deletedAt'),
        restaurant: _get(item, dbAliases.restaurantItems.restaurant),
        images: _get(item, dbAliases.restaurantItems.restaurantItemImages),
        ratings: _get(item, dbAliases.restaurantItems.userRatings),
      };
};

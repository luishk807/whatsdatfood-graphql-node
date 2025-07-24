import { _get } from '.';
import { convertStringToNumber, getTimeSplit } from 'helpers';
import { RestaurantsInput } from 'db/models/restaurants';
import { RestaurantMenuItemsInput } from 'db/models/restaurantMenuItems';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';
import RestaurantBusinessHours, {
  RestaurantBusinessHoursInput,
} from 'db/models/restaurantBusinessHours';
import { getSlug, getBuiltAddress } from '.';
import { RestaurantMenuItem, Restaurant } from 'interfaces/restaurant';
import { dbAliases } from 'db';
import { BusinessHours } from 'interfaces';
export const buildRestaurantPayload = (item: RestaurantsInput) => {
  const address_data = {
    address: _get(item, 'address'),
    city: _get(item, 'city'),
    state: _get(item, 'state'),
    country: _get(item, 'country'),
  };

  const full_address = getBuiltAddress({
    ...address_data,
  });
  const slug = getSlug(`${_get(item, 'name')} ${full_address}`);
  return {
    name: _get(item, 'name'),
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

export const buildRestaurantBusinessHoursPayload = (
  id: number,
  businessHours: BusinessHours,
): RestaurantBusinessHoursInput[] | null => {
  if (!businessHours) {
    return null;
  }

  if (!Object.keys(businessHours).length) {
    return null;
  }

  console.log(businessHours, 'business horus');
  const payload: RestaurantBusinessHoursInput[] = [];
  Object.keys(businessHours).forEach((day) => {
    const times = getTimeSplit(businessHours[day]);
    const dayFormat = day.toLowerCase();
    if (times && dayFormat) {
      const item: RestaurantBusinessHoursInput = {
        restaurant_id: id,
        day_of_week: day,
        open_time: times.open_time,
        close_time: times.close_time,
        status_id: 1,
      };
      payload.push(item);
    }
  });

  return payload;
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

export const getRestaurantBusinessHoursResponse = (
  data: RestaurantBusinessHours,
) => {
  return {
    id: _get(data, 'id'),
    restaurant_id: _get(data, 'restaurant_id'),
    day_of_week: _get(data, 'day_of_week'),
    open_time: _get(data, 'open_time'),
    close_time: _get(data, 'close_time'),
    status_id: _get(data, 'status_id'),
    createdAt: _get(data, 'createdAt'),
    updatedAt: _get(data, 'updatedAt'),
    deletedAt: _get(data, 'deletedAt'),
    status: _get(data, dbAliases.restaurantBusinessHours.status),
  };
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
    businessHours: _get(data, dbAliases.restaurant.restaurantBusinessHours),
  };
};

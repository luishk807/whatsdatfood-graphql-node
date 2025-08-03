import sequelize from 'db/sequelize';
import Restaurants from 'db/models/restaurants';
import UserSearchTypes from './models/userSearchTypes';
export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
    await sequelize.sync({ alter: false });
    console.log('Database synced.');
  } catch (err) {
    console.error('Unable to conecct to the database: ', err);
  }
};

export const dbAliases = {
  restaurant: {
    restaurantItems: 'restRestaurantItems',
    restaurantBusinessHours: 'restaurantRestaurantBusinessHours',
    restaurantHolidays: 'restaurantRestaurantHolidays',
    restaurantCategories: 'restaurantRestaurantCategories',
  },
  restaurantItems: {
    restaurant: 'restaurantItemRest',
    restaurantItemImages: 'restaurantItemRestImages',
    userRatings: 'restaurantItemUserRatings',
    status: 'restaurantItemStatus',
  },
  restaurantItemImages: {
    restaurantItem: 'restaurantItemImageRestItem',
    user: 'restaurantItemImageUser',
    status: 'restaurantItemImageStatus',
  },
  users: {
    userRole: 'userUserRole',
    status: 'userStatus',
    userRatings: 'userUserRatings',
    userFavorites: 'userUserFavorites',
    userSearches: 'userUserSearches',
    friends: 'userUserFriends',
  },
  userRole: {
    user: 'userRoleUser',
  },
  userSearches: {
    restaurant: 'userSearchesRestaurant',
    user: 'userSearchesUser',
    userSearchTypes: 'userSearchUserSearchType',
  },
  userFavorites: {
    user: 'userFavoritesUser',
    restaurant: 'userFavoritesRestaurant',
  },
  userRatings: {
    user: 'userRatingUser',
    restaurantItem: 'userRatingRestaurantItem',
    status: 'userRatingStatus',
  },
  holidays: {
    status: 'holidayStatus',
  },
  foodCategories: {
    status: 'foodCategoryStatus',
  },
  restaurantBusinessHours: {
    status: 'restaurantBusinessHourStatus',
    restaurant: 'restaurantBusinessHourRestaurant',
  },
  restaurantCategories: {
    status: 'restaurantCategoryStatus',
    restaurant: 'restaurantCategoryRestaurant',
    foodCategory: 'restaurantCategoryFoodCategory',
  },
  restaurantHoliday: {
    status: 'restaurantHolidayStatus',
    restaurant: 'restaurantHolidayRestaurant',
    holiday: 'restaurantHolidayHoliday',
  },
  userFriends: {
    user: 'userFriendsUser',
  },
};

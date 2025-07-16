import sequelize from 'db/sequelize';
import Restaurants from 'db/models/restaurants';
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
  },
  restaurantItems: {
    restaurant: 'restaurantItemRest',
    restaurantItemImages: 'restaurantItemRestImages',
    userRatings: 'restaurantItemUserRatings',
  },
  restaurantItemImages: {
    restaurantItem: 'restaurantItemImageRestItem',
    user: 'restaurantItemImageUser',
  },
  users: {
    userRole: 'userUserRole',
  },
  userRole: {
    user: 'userRoleUser',
  },
  userRatings: {
    user: 'userRatingUser',
    restaurantItem: 'userRatingRestaurantItem',
  },
};

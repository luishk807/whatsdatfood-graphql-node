import express from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  getAllResturantByName,
  getRestaurantBySlug,
} from 'controllers/restaurants.controller';
const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);
router.get('/find', getRestaurantBySlug);
router.get('/find-match', getAllResturantByName);

export default router;

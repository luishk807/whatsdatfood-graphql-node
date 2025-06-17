import express from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  getAllResturantByName,
} from '../controllers/restaurants.controller';
const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);
router.get('/find-match', getAllResturantByName);

export default router;

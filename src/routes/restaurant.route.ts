import express from 'express';
import {
  createRestaurant,
  getAllRestaurants,
} from '../controllers/restaurants.controller';
const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);

export default router;

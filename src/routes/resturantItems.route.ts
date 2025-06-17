import express from 'express';
import {
  createRetaurantMenuItems,
  getAllRestaurantMenuItems,
} from '../controllers/restaurantMenuItems.controller';
const router = express.Router();

router.get('/', getAllRestaurantMenuItems);
router.post('/', createRetaurantMenuItems);

export default router;

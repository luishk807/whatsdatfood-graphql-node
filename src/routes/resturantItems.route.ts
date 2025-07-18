import express from 'express';
import { getAllRestaurantMenuItems } from 'controllers/restaurantMenuItems.controller';
const router = express.Router();

router.get('/', getAllRestaurantMenuItems);

export default router;

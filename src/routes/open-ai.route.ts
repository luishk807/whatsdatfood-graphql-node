import { Router } from 'express';
import { getAIMenu, getAIRestaurantList } from 'controllers/openAi.controller';

const router = Router();

router.get('/get-menu', getAIMenu);

router.get('/get-restaurant-list', getAIRestaurantList);

export default router;

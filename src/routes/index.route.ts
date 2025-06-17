import { Router } from 'express';
import openaiRouter from './open-ai.route';
import restauntRouter from './restaurant.route';
import userRouter from './users.route';
import restaurantMenuItemRoute from './resturantItems.route';
const router = Router();

router.use('/open-ai', openaiRouter);
router.use('/restaurants', restauntRouter);
router.use('/users', userRouter);
router.use('/restaurant-menu-items', restaurantMenuItemRoute);

export default router;

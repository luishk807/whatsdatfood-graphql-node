import { Router } from 'express';
import openaiRouter from 'routes/open-ai.route';
import restauntRouter from 'routes/restaurant.route';
import userRouter from 'routes/users.route';
import restaurantMenuItemRoute from 'routes/resturantItems.route';
const router = Router();

router.use('/open-ai', openaiRouter);
router.use('/restaurants', restauntRouter);
router.use('/users', userRouter);
router.use('/restaurant-menu-items', restaurantMenuItemRoute);

export default router;

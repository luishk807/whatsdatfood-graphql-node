import { Router } from 'express';
import restaurantMenuItemRoute from 'routes/resturantItems.route';
const router = Router();

router.use('/restaurant-menu-items', restaurantMenuItemRoute);

export default router;

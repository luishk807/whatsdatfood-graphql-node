import { Router } from 'express';
import openaiRouter from './open-ai.route';
import restauntRouter from './restaurant.route';
import userRouter from './users.route';
const router = Router();

router.use('/open-ai', openaiRouter);
router.use('/restaurants', restauntRouter);
router.use('/users', userRouter);

export default router;

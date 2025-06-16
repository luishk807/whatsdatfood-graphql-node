import { Router } from 'express';
import openaiRouter from './open-ai';
const router = Router();

router.use('/open-ai', openaiRouter);

export default router;

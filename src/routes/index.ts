import express from 'express';
import openaiRouter from './open-ai';
const router = express.Router();

router.use('/open-ai', openaiRouter);

export default router;

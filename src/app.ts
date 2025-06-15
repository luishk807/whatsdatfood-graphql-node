import express from 'express';
import cors from 'cors';
import openAIRouter from './routes/open-ai';
import { ErrorHandler } from './middlewares/errorHandler';
const app = express();
//cors
app.use(cors());
app.use(express.json());

//Routes
app.use('/open-ai', openAIRouter);

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
};
//global error habndler
app.use(cors(corsOptions));
app.use(ErrorHandler);

export default app;

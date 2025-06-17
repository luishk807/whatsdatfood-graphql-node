import express from 'express';
import cors from 'cors';
import { ErrorHandler } from './middlewares/errorHandler';
import routes from './routes/index.route';
const app = express();
//cors
app.use(cors());
app.use(express.json());

//Routes
app.use('/', routes);

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
};
//global error habndler
app.use(cors(corsOptions));
app.use(ErrorHandler);

export default app;

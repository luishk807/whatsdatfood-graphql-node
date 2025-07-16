import express, { Application } from 'express';
import cors from 'cors';
import { ErrorHandler } from 'middlewares/errorHandler';
import routes from 'routes/index.route';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
//cors
// app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
};

//global error habndler
app.use(cors(corsOptions));

//Routes
app.use('/', routes);

app.use(ErrorHandler);

export default app;

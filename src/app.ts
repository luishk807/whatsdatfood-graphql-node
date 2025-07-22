import express, { Application } from 'express';
import cors from 'cors';
import { ErrorHandler } from 'middlewares/errorHandler';
import routes from 'routes/index.route';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app: Application = express();
//cors
// app.use(cors());
// app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true, // 👈 allow sending cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

//global error habndler
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

//Routes
app.use('/', routes);

app.use(ErrorHandler);

export default app;

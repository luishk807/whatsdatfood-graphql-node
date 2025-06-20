import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'development';
dotenv.config();
const config = require(__dirname + '/../config.ts')[env];

const { host, port, username, password, database } = config;

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: host,
  database: database,
  port: Number(port),
  username: username,
  password: password,
});

export default sequelize;

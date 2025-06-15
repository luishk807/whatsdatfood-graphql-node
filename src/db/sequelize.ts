import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'development';
dotenv.config();
const config = require(__dirname + '/../config.ts')[env];

const { host, port, username, password } = config;

const sequelize = new Sequelize({
  dialect: 'postgres' as Dialect,
  host: host,
  port: Number(port),
  username: username,
  password: password,
  logging: false,
});

export default sequelize;

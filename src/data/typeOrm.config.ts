/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, '../**/*Entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/migrations/*.js')],
  logging: true,
});

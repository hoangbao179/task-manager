import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,  
  logging: true,
  entities: [__dirname + '/../entities/*.ts'], 
  migrations: [__dirname + '/../migrations/*.ts'],  
  subscribers: [__dirname + '/../subscribers/*.ts'], 
});

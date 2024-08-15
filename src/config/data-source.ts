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
  synchronize: true,  
  logging: true,
  entities: [__dirname + '/../entities/*.{js,ts}'], 
  migrations: [__dirname + '/../migrations/*.{js,ts}'],  
  subscribers: [__dirname + '/../subscribers/*.{js,ts}'], 
});

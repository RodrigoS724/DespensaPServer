import dotenv from 'dotenv';
import path from 'path';
const envPath = path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`);
dotenv.config({ path: envPath });
const config = {
  NODE_ENV: process.env.NODE_ENV || '',
  HOST: process.env.HOST || '',
  PORT: process.env.PORT || '',
  DBHOST: process.env.DBHOST || '',
  DBPORT: process.env.DBPORT || '',
  DBUSER: process.env.DBUSER || '',
  DBNAME: process.env.DBNAME || '',
  DBPASS: process.env.DBPASS || '',
  SECRET: process.env.SECRET || '',
  SALT: process.env.SALT || ''
};

export default config;

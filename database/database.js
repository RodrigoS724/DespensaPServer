import config from '../config.js';
import { createConnection } from 'mysql2/promise';

export const connection = await createConnection({
  host: config.DBHOST,
  user: config.DBUSER,
  port: config.DBPORT,
  password: '',
  database: config.DBNAME
});

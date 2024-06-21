import express, { json } from 'express';
import session from 'express-session';
import { corsMiddleware } from './middleware/cors.js';
import logger from 'morgan';
import path from 'path';
import { createStoreRoutes } from './routes/store.js';
import { createUserRoutes } from './routes/user.js';
import { createBrandRoutes } from './routes/brand.js';
import { authMiddleware /*, adminMiddleware */ } from './middleware/authRoutes.js';
import { config } from 'dotenv';
import Parse from 'parse/node.js';
Parse.initialize('APP_ID', 'JS_KEY');
Parse.serverURL = 'https://parseapi.back4app.com/';
config();
export const createAPP = ({ storeModel, userModel, brandModel }) => {
  const app = express();
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // cambiar a true cuando este en produccion o agreagar a las env
  }));
  app.disable('x-powered-by');
  app.use(logger('dev'));
  app.use(json());
  app.use(corsMiddleware());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(process.cwd(), '../public/')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), '../web/index.html'));
  });
  app.use('/store', authMiddleware, createStoreRoutes({ storeModel }));
  app.use('/', createUserRoutes({ userModel }));
  app.use('/brand', createBrandRoutes({ brandModel }));
  // app.use("/admin", adminMiddleware, createAdminRoutes({}));
  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
  });
};

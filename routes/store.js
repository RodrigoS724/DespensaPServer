import { Router } from 'express';
import { StoreController } from '../controllers/storeController.js';
import path from 'path';
export const createStoreRoutes = ({ storeModel }) => {
  const itemRouter = Router();

  const itemController = new StoreController({ storeModel });
  itemRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), '../web/resources/store/store.html'));
  });

  itemRouter.get('/new', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), '../web/resources/store/item.html'));
  });

  itemRouter.get('/api/items/:userId', itemController.getAll);
  itemRouter.get('/api/items/scheme', itemController.getAllSchemes);
  itemRouter.get('/api/item/:userId&:id', itemController.getByID);
  itemRouter.post('/api/item/new', itemController.create);

  itemRouter.delete('/api/item/delete/:id', itemController.delete);
  itemRouter.patch('/api/item/update/:id', itemController.update);

  return itemRouter;
};

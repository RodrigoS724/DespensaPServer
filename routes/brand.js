import { Router } from 'express';
import { BrandController } from '../controllers/BrandController.js';

export const createBrandRoutes = ({ BrandModel }) => {
  const brandRoutes = Router();

  const brandController = new BrandController({ BrandModel });

  brandRoutes.get('/api/getBrands', brandController.getAll);
  brandRoutes.post('/api/newBrand', brandController.create);
  brandRoutes.delete('/api/deleteBrand/:name', brandController.delete);
  brandRoutes.patch('/api/updateBrand/:name', brandController.update);
  return brandRoutes;
};

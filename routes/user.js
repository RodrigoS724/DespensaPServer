import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authRoutes.js';
import path from 'path';

export const createUserRoutes = ({ userModel }) => {
  const userRouter = Router();

  const userController = new UserController({ userModel });
  userRouter.get('/login', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), '../web/resources/login/login.html'));
  });

  userRouter.post('/api/login', userController.verifyUser);
  userRouter.post('/api/register', userController.newUser);

  userRouter.delete('/api/deleteUser/:id', authMiddleware, userController.delete);
  userRouter.patch('/api/updateUser/:id', authMiddleware, userController.update);

  return userRouter;
};

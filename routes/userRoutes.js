import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
export const userRouter = Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.post('/', UserController.loginUser);


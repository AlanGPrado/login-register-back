import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
export const userRouter = Router();

userRouter.post('/register', UserController.postUser);
userRouter.post('/login', UserController.loginUser);

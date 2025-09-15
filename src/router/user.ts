import { Router } from 'express';
import { GetUser, LoginUser, SignupUser } from '../controller/user.js';
import { authMiddleware } from '../middleware/auth.js';

const userRouter = Router();

userRouter.post('/signup', SignupUser)
userRouter.post('/signin', LoginUser)
userRouter.get('/user',authMiddleware, GetUser)

export default userRouter;
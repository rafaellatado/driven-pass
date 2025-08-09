import { Router } from 'express';
import { eraseAccount } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.delete('/erase', authenticateToken, eraseAccount);

export default userRouter;

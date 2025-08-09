import { Router, type Request, type Response } from 'express';
import * as authController from '../controllers/authController';
import { validateSchema } from '../middlewares/validateSchema';
import { signUpSchema, signInSchema } from '../schemas/authSchemas';

const authRouter: Router = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), authController.signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), authController.signIn)

export default authRouter;

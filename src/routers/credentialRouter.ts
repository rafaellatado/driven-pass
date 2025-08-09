import { Router } from 'express';
import { createCredential } from '../controllers/credentialController';
import { validateSchema } from '../middlewares/validateSchema';
import { credentialSchema } from '../schemas/credentialSchema';
import { authenticateToken } from '../middlewares/authMiddleware';

const credentialRouter = Router();

credentialRouter.post(
  '/credentials',
  authenticateToken,
  validateSchema(credentialSchema),
  createCredential
);

export default credentialRouter;

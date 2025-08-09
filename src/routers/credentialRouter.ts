import { Router } from 'express';
import { createCredential, getCredentials } from '../controllers/credentialController';
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

credentialRouter.get(
  '/credentials',
  authenticateToken,
  getCredentials
);

credentialRouter.get(
  '/credentials/:id',
  authenticateToken,
  getCredentials
);

export default credentialRouter;

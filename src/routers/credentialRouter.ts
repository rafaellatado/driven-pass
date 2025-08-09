import { Router } from 'express';
import { createCredential, getCredentials, updateCredential, deleteCredential } from '../controllers/credentialController';
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

credentialRouter.put(
  '/credentials/:id',
  authenticateToken,
  validateSchema(credentialSchema),
  updateCredential
);

credentialRouter.delete(
  '/credentials/:id',
  authenticateToken,
  deleteCredential
);

export default credentialRouter;

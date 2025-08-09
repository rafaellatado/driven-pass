import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService';

interface CreateCredentialBody {
  title: string;
  url: string;
  username: string;
  password: string;
}

export interface CustomError extends Error {
  type?: 'conflict' | 'unauthorized' | 'not_found' | 'bad_request' | 'unprocessable_entity';
}

export async function createCredential(
  req: Request<unknown, unknown, CreateCredentialBody>,
  res: Response
) {
  try {
    const { title, url, username, password } = req.body;
    const userId = res.locals.userId;
    if (!userId) return res.status(401).send('Unauthorized');

    await credentialService.createCredential({
      title,
      url,
      username,
      password,
      userId,
    });

    return res.sendStatus(201);
  } catch (err: unknown) {
    const error = err as CustomError;
    if (error.type === 'conflict') return res.status(409).send(error.message);
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}

export async function getCredentials(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;
    if (!userId) return res.status(401).send('Unauthorized');

    const { id } = req.params;

    if (id) {
      const credentialId = Number(id);
      if (isNaN(credentialId)) return res.status(400).send('Invalid credential ID');

      const credential = await credentialService.getCredentialById(credentialId, userId);
      return res.status(200).send(credential);
    }

    const credentials = await credentialService.getAllCredentials(userId);
    return res.status(200).send(credentials);
  } catch (err: unknown) {
    const error = err as CustomError;
    if (error.type === 'not_found') return res.status(404).send(error.message);
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}

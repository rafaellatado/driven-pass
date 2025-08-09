import { Request, Response } from 'express';
import * as authService from '../services/authService';

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

interface SignInBody {
  email: string;
  password: string;
}

export async function signUp(req: Request<unknown, unknown, SignUpBody>, res: Response) {
  try {
    const { name, email, password } = req.body;

    await authService.signUp({ name, email, password });
    return res.sendStatus(201);
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'type' in error &&
      (error as any).type === 'conflict'
    ) {
      return res.status(409).send((error as any).message);
    }

    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

export async function signIn(req: Request<unknown, unknown, SignInBody>, res: Response) {
  try {
    const { email, password } = req.body;

    const token = await authService.signIn({ email, password });

    return res.status(200).send({ token });
  } catch (error: any) {
    if (error.type === 'not_found') return res.status(404).send(error.message);
    if (error.type === 'unauthorized') return res.status(401).send(error.message);

    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}


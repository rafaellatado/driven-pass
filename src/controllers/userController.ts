import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function eraseAccount(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;
    if (!userId) return res.status(401).send('Unauthorized');

    await userService.eraseUserData(userId);

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

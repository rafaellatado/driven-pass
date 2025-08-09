import { NextFunction, Request, Response } from 'express';

interface AppError extends Error {
  type?: 'conflict' | 'unauthorized' | 'not_found' | 'bad_request' | 'unprocessable_entity';
  message: string;
}

export default function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  console.error(err);

  switch (err.type) {
    case 'conflict':
      return res.status(409).send(err.message);
    case 'unauthorized':
      return res.status(401).send(err.message);
    case 'not_found':
      return res.status(404).send(err.message);
    case 'bad_request':
      return res.status(400).send(err.message);
    case 'unprocessable_entity':
      return res.status(422).send(err.message);
    default:
      return res.status(500).send('Internal Server Error');
  }
}

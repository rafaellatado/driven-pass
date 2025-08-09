import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayloadWithUserId {
  userId: number;
  email?: string;
  iat?: number;
  exp?: number;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization') || req.header('authorization');
  if (!authHeader) return res.status(401).send('Missing Authorization header');

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer')
    return res.status(401).send('Invalid Authorization format');

  const token = parts[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).send('Server misconfigured: no JWT secret');

    const payload = jwt.verify(token, secret) as JwtPayloadWithUserId;

    if (!payload || typeof payload.userId !== 'number') {
      return res.status(401).send('Invalid token payload');
    }

    // Guarda userId em res.locals sem alterar o tipo Response
    res.locals.userId = payload.userId;
    next();
  } catch {
    return res.status(401).send('Invalid or expired token');
  }
}

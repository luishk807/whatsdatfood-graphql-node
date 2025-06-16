import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: any;
  }
}
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authheader = req.headers['authorization'];
  const token: string | undefined =
    (authheader && authheader.split(' ')[1]) || '';

  if (token === null) return res.sendStatus(401);

  const env_token: string | undefined = process.env.ACCESS_TOKEN_SECRET || '';

  jwt.verify(token, env_token, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

import { Request, Response, NextFunction } from 'express';
import { authenticate } from 'helpers/login';

declare module 'express' {
  interface Request {
    user?: any;
  }
}
export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = authenticate(req);

  if (token === null) return res.sendStatus(401);

  req.user = token;
  next();
};

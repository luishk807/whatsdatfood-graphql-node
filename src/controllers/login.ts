import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;

  const env_token: string | undefined = process.env.ACCESS_TOKEN_SECRET || '';

  const user = {
    name: username,
  };

  const accessToken = jwt.sign(user, env_token);

  res.json({
    accessToken: accessToken,
  });
};

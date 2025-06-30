import { Request, Response, NextFunction } from 'express';
import { createJSONWebToken } from 'helpers/login';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = {
    name: username,
  };

  const accessToken = createJSONWebToken(user);

  res.json({
    accessToken: accessToken,
  });
};

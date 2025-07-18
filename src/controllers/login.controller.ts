import { Request, Response, NextFunction } from 'express';
import { createJSONWebToken } from 'helpers/login';
import LoginServices from 'services/login.service';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log('controller login');
  try {
    const resp = await LoginServices.login(username, password);
    const { user, token } = resp;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'products',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15,
    });

    res.json({
      message: 'logged in',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

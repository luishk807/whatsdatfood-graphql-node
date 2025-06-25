import UserServices from 'services/users.service';
import { Request, Response, NextFunction } from 'express';
import { UserInput } from 'db/models/users';
import dayjs from 'dayjs';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload: UserInput = req.body;
  const resp = await UserServices.create(payload);
  res.status(200).json({
    data: resp,
  });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const resp = await UserServices.getAll();
  res.json({
    data: resp,
  });
};

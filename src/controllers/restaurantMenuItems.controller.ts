import RestaurantMenuItemServices from '../services/restaurantMenuItems.service';
import { Request, Response, NextFunction } from 'express';

export const createRetaurantMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const resp = await RestaurantMenuItemServices.create(payload);
  res.status(200).json(resp);
};

export const getAllRestaurantMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const resp = await RestaurantMenuItemServices.getAll();
  res.json({
    data: resp,
  });
};

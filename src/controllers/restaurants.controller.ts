import { Request, Response, NextFunction } from 'express';
import { RestaurantsInput } from '../db/models/restaurants';
import restaurantServices from '../services/restaurants.service';
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body);
  const payload: RestaurantsInput = req.body;
  const resp = await restaurantServices.create(payload);
  res.status(200).json({
    data: resp,
  });
};

export const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const resp = await restaurantServices.getAll();
  res.status(200).json({
    data: resp,
  });
};

export const getAllResturantByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { restaurant, page, limit } = req.query;
  const resp = await restaurantServices.findByName(
    String(restaurant),
    Number(page),
    Number(limit),
  );
  res.json({
    data: resp,
  });
};

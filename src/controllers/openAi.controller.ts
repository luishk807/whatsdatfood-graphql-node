import { NextFunction, Request, Response } from 'express';
import OpenAiService from '../services/openAi.service';
export const getAIMenu = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { restaurant, address } = req.query;

    const resp = await OpenAiService.getAIMenu(
      restaurant as string,
      address as string,
    );
    res.json(resp);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAIRestaurantList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { restaurant } = req.query;

    const resp = await OpenAiService.getAIRestaurantList(restaurant as string);
    res.json(resp);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

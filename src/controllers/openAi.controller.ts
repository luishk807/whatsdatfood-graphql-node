import { NextFunction, Request, Response } from 'express';
import OpenAiService from 'services/openAi.service';
export const getAIMenu = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.query;

    const resp = await OpenAiService.getAIRestaurantMenu(slug as string);
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

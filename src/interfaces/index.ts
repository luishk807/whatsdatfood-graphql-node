import DataLoader from 'dataloader';
import { RestaurantsOutput } from 'db/models/restaurants';
import { Response, Request } from 'express';

import {
  RestaurantType,
  RestaurantItemType,
  RestaurantAIResponse,
} from 'types/restaurant';

import { UserResponseType, UserType } from 'types/user';

export interface GraphQLServerContext {
  res: Response;
  req: Request;
  user: UserResponseType | null;
  restaurantRestaurantItemsDataLoader: DataLoader<number, RestaurantItemType[]>;
  restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
  aiRestaurantNameList: DataLoader<string, RestaurantAIResponse[] | []>;
  aiRestaurantDataBySlug: DataLoader<string, RestaurantAIResponse>;
}

export interface RestaurantsWithItemsOutput extends RestaurantsOutput {
  restRestaurantItems: RestaurantItemType[];
}

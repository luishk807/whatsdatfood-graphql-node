import DataLoader from 'dataloader';
import { RestaurantsOutput } from 'db/models/restaurants';
import { Response, Request } from 'express';
import { ID } from 'types';
import {
  Restaurant,
  RestaurantMenuItem,
  RestaurantAI,
} from 'interfaces/restaurant';

import { User } from 'interfaces/user';

export interface GraphQLServerContext {
  res: Response;
  req: Request;
  user: User | null;
  restaurantRestaurantItemsDataLoader: DataLoader<number, RestaurantMenuItem[]>;
  restaurantItemRestaurant: DataLoader<number, Restaurant | null>;
  aiRestaurantNameList: DataLoader<string, RestaurantAI[] | []>;
  aiRestaurantDataBySlug: DataLoader<string, RestaurantAI>;
}

export interface RestaurantsWithItemsOutput extends RestaurantsOutput {
  restRestaurantItems: RestaurantMenuItem[];
}
export interface BusinessHours {
  [key: string]: string;
}

export interface Address {
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface Status {
  id: ID;
  name: string;
}

export interface GooogleResponseAPIItem {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: string;
  fileFormat: string;
  buffer?: Buffer | null;
  image: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}

export interface LoginPayload {
  success: boolean;
}
export interface GoogleResponseAPI {
  items: [GooogleResponseAPIItem];
}

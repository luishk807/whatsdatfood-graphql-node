import DataLoader from 'dataloader';
import { RestaurantsOutput } from 'db/models/restaurants';
import { Response, Request } from 'express';
import { ID } from 'types';
import {
  RestaurantResponse,
  RestaurantItemResponse,
  RestaurantAIResponse,
} from 'interfaces/restaurant';

import { UserResponse } from 'interfaces/user';

export interface GraphQLServerContext {
  res: Response;
  req: Request;
  user: UserResponse | null;
  restaurantRestaurantItemsDataLoader: DataLoader<
    number,
    RestaurantItemResponse[]
  >;
  restaurantItemRestaurant: DataLoader<number, RestaurantResponse | null>;
  aiRestaurantNameList: DataLoader<string, RestaurantAIResponse[] | []>;
  aiRestaurantDataBySlug: DataLoader<string, RestaurantAIResponse>;
}

export interface RestaurantsWithItemsOutput extends RestaurantsOutput {
  restRestaurantItems: RestaurantItemResponse[];
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

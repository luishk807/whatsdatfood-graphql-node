import DataLoader from 'dataloader';
import { RestaurantsOutput } from 'db/models/restaurants';
import { Response, Request } from 'express';

import {
  RestaurantType,
  RestaurantItemType,
  RestaurantAIResponse,
} from 'interfaces/restaurant';

import { UserResponseType, UserType } from 'interfaces/user';

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

export interface addressType {
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface StatusType {
  id: number;
  name: string;
}

export interface gooogleResponseAPIItemTypes {
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
export interface googleResponseAPIType {
  items: [gooogleResponseAPIItemTypes];
}

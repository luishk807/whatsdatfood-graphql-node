import DataLoader from 'dataloader';
import { RestaurantsOutput } from 'db/models/restaurants';

import {
  RestaurantType,
  RestaurantItemType,
  UserType,
  RestaurantAIResponse,
} from 'types';

export interface GraphQLServerContext {
  user: UserType | null;
  restaurantRestaurantItemsDataLoader: DataLoader<number, RestaurantItemType[]>;
  restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
  aiRestaurantNameList: DataLoader<string, RestaurantAIResponse[] | []>;
  aiRestaurantDataBySlug: DataLoader<string, RestaurantAIResponse>;
}

export interface RestaurantsWithItemsOutput extends RestaurantsOutput {
  restRestaurantItems: RestaurantItemType[];
}

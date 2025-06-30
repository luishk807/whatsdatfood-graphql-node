import DataLoader from 'dataloader';

import {
  RestaurantType,
  RestaurantItemType,
  UserType,
  ResturantAIResponse,
} from 'types';

export interface GraphQLServerContext {
  user: UserType | null;
  restaurantRestaurantItemsDataLoader: DataLoader<number, RestaurantItemType[]>;
  restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
  aiRestaurant: DataLoader<string, ResturantAIResponse[] | []>;
}

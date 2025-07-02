import DataLoader from 'dataloader';

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
  aiRestaurant: DataLoader<string, RestaurantAIResponse[] | []>;
  // aiRestaurantBySlug: DataLoader<string, RestaurantAIResponse[] | []>;
}

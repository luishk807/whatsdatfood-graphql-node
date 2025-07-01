import DataLoader from 'dataloader';

import {
  RestaurantType,
  RestaurantItemType,
  UserType,
  RestaurantAIResponse,
  RestaurantMenuItemsAIResponse,
} from 'types';

export interface GraphQLServerContext {
  user: UserType | null;
  restaurantRestaurantItemsDataLoader: DataLoader<number, RestaurantItemType[]>;
  restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
  aiRestaurant: DataLoader<string, RestaurantAIResponse[] | []>;
  aiRestaurantMenuItem: DataLoader<
    string,
    RestaurantMenuItemsAIResponse[] | []
  >;
}

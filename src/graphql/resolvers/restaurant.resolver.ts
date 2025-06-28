import RestaurantServices from 'services/restaurants.service';
import RestaurantMenuItems from 'services/restaurantMenuItems.service';
import { IResolvers } from '@graphql-tools/utils'; // or your GraphQL resolver typings
import {
  RestaurantType,
  RestaurantItemType,
  createRestaurantArgInput,
} from 'types';
import { RestaurantsOutput } from 'db/models/restaurants';
import DataLoader from 'dataloader';

export const restaurantResolvers: IResolvers = {
  Query: {
    restaurants: async (): Promise<RestaurantType[]> =>
      await RestaurantServices.getAll(),
    restaurantBySlug: async (
      _parent: any,
      args: { slug: string },
    ): Promise<RestaurantsOutput | null> =>
      await RestaurantServices.findBySlug(args.slug),
    restaurantByName: async (
      _parent: any,
      args: { name: string },
    ): Promise<RestaurantsOutput | null> =>
      await RestaurantServices.findByName(args.name),
  },
  Restaurant: {
    items: async (
      _parent: RestaurantType,
      _args: any,
      context: {
        restaurantRestaurantItemsDataLoader: DataLoader<
          number,
          RestaurantItemType[]
        >;
      },
      {},
    ): Promise<RestaurantItemType[]> => {
      return context.restaurantRestaurantItemsDataLoader.load(_parent.id);
    },
  },
  RestaurantMenuItems: {
    restaurant: async (
      parent: RestaurantItemType,
      _args: any,
      context: {
        restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
      },
    ): Promise<RestaurantType | null> => {
      return context.restaurantItemRestaurant.load(parent.restaurant_id);
    },
    images: (): any[] => {
      return [];
    },
  },
  Mutation: {
    addRestaurant: async (
      _parent: any,
      args: createRestaurantArgInput,
    ): Promise<RestaurantType> => {
      const { input } = args;
      return await RestaurantServices.create({ ...input });
    },
  },
};

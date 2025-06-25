import RestaurantServices from '../../services/restaurants.service';
import RestaurantMenuItems from '../../services/restaurantMenuItems.service';
import { IResolvers } from '@graphql-tools/utils'; // or your GraphQL resolver typings
import {
  RestaurantType,
  RestaurantItemType,
  createRestaurantInput,
} from '../../types';
import { RestaurantsOutput } from '../../db/models/restaurants';
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
    items: async (_parent: RestaurantType): Promise<RestaurantItemType[]> => {
      return await RestaurantMenuItems.findItemsByRestaurantId(_parent.id);
    },
  },
  RestaurantMenuItems: {
    restaurant: async (
      parent: RestaurantItemType,
    ): Promise<RestaurantItemType | null> => {
      return await RestaurantServices.findById(parent.restaurant_id);
    },
    images: (): any[] => {
      return [];
    },
  },
  Mutation: {
    addRestaurant: async (
      _parent: any,
      args: createRestaurantInput,
    ): Promise<RestaurantType> => {
      return await RestaurantServices.create({ ...args });
    },
  },
};

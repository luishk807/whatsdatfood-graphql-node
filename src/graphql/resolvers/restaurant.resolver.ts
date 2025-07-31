import RestaurantServices from 'services/restaurants.service';
import RestaurantMenuItemImagesFn from 'services/restaurantMenuItemImages.service';
import { IResolvers } from '@graphql-tools/utils'; // or your GraphQL resolver typings
import {
  Restaurant,
  RestaurantMenuItem,
  CreateRestaurantArgInput,
} from 'interfaces/restaurant';
import { RestaurantsInput } from 'db/models/restaurants';
import DataLoader from 'dataloader';
import { NotFoundError } from 'graphql/customErrors';
import { DateTimeResolver } from 'graphql-scalars';

export const restaurantResolvers: IResolvers = {
  DateTime: DateTimeResolver,
  Query: {
    restaurants: async (): Promise<Restaurant[]> => {
      const resp = await RestaurantServices.getAll();
      if (!resp) {
        throw new NotFoundError('No restaurant available');
      }
      return Array.isArray(resp) ? resp : [];
    },
    aiRestaurantBySlug: async (
      _parent: any,
      args: { slug: string },
      context: {
        aiRestaurantDataBySlug: DataLoader<string, Restaurant>;
      },
    ): Promise<Restaurant | null> => {
      return context.aiRestaurantDataBySlug.load(args.slug);
    },
    aiRestaurantNameList: async (
      _parent: any,
      _args: { name: string },
      context: {
        aiRestaurantNameList: DataLoader<string, Restaurant[]>;
      },
    ) => {
      return context.aiRestaurantNameList.load(_args.name);
    },
    getRestaurantImage: async (_: any, args: { id: number }) => {
      const images = await RestaurantMenuItemImagesFn.findItemImageByRestItemId(
        args.id,
      );
      console.log(images);
      return images;
    },
  },
  Restaurant: {
    restaurantMenuItems: async (
      parent: Restaurant,
      _args: any,
      {},
    ): Promise<RestaurantMenuItem[]> => {
      return parent.restaurantMenuItems ?? [];
    },
    businessHours: async (parent: Restaurant) => parent.businessHours,
    holidays: async (parent: Restaurant) => parent.holidays,
    foodCategories: async (parent: Restaurant) => parent.foodCategories,
  },
  RestaurantMenuItem: {
    ratings: async (parent: RestaurantMenuItem) => parent.ratings,
    images: async (parent: RestaurantMenuItem) => parent.images,
    restaurant: async (parent: RestaurantMenuItem) => parent.restaurant,
  },
  Mutation: {
    addRestaurant: async (
      _parent: any,
      args: CreateRestaurantArgInput,
      context: any,
    ): Promise<Restaurant> => {
      if (!context.user) {
        //check authtenthication
      }
      const { input } = args;
      return await RestaurantServices.create(input as RestaurantsInput);
    },
  },
};

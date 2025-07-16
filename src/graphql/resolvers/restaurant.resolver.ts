import RestaurantServices from 'services/restaurants.service';
import RestaurantMenuItemImagesFn from 'services/restaurantMenuItemImages.service';
import OpenAiResturant from 'services/openAi.service';
import { IResolvers } from '@graphql-tools/utils'; // or your GraphQL resolver typings
import {
  RestaurantType,
  RestaurantItemType,
  RestaurantMenuItemsAIResponse,
  createRestaurantArgInput,
  RestaurantAIResponse,
  UserRating,
} from 'types';
import { dbAliases } from 'db/index';
import { RestaurantsOutput } from 'db/models/restaurants';
import DataLoader from 'dataloader';
import { NotFoundError } from 'graphql/customErrors';

export const restaurantResolvers: IResolvers = {
  Query: {
    restaurants: async (): Promise<RestaurantsOutput[]> => {
      const resp = await RestaurantServices.getAll();
      if (!resp) {
        throw new NotFoundError('No restaurant available');
      }
      return resp;
    },
    aiRestaurantBySlug: async (
      _parent: any,
      args: { slug: string },
      context: {
        aiRestaurantDataBySlug: DataLoader<string, RestaurantAIResponse>;
      },
    ): Promise<RestaurantAIResponse | null> => {
      return context.aiRestaurantDataBySlug.load(args.slug);
    },
    aiRestaurantNameList: async (
      _parent: any,
      _args: { name: string },
      context: {
        aiRestaurantNameList: DataLoader<string, RestaurantAIResponse[]>;
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
    restRestaurantItems: async (
      _parent: RestaurantAIResponse,
      _args: any,
      {},
    ): Promise<RestaurantMenuItemsAIResponse[]> => {
      const key = dbAliases.restaurant
        .restaurantItems as keyof RestaurantAIResponse;
      const value = _parent[key];
      return Array.isArray(value) ? value : [];
    },
  },
  RestaurantAIResponse: {
    restRestaurantItems: async (
      parent: RestaurantAIResponse,
      args: any,
      {},
    ): Promise<RestaurantMenuItemsAIResponse[]> => {
      const key = dbAliases.restaurant
        .restaurantItems as keyof RestaurantAIResponse;
      const value = parent[key];
      return Array.isArray(value) ? value : [];
    },
  },
  RestaurantMenuItemsAIResponse: {
    restaurantItemUserRatings: async (
      parent: RestaurantMenuItemsAIResponse,
      args: any,
    ) => {
      return parent.restaurantItemUserRatings || [];
    },
    restaurantItemImages: async (parent: RestaurantMenuItemsAIResponse) => {
      return parent.restaurantItemRestImages || [];
    },
  },
  RestaurantMenuItems: {
    restaurantItemRest: async (
      parent: RestaurantItemType,
      args: any,
      context: {
        restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
      },
    ): Promise<RestaurantType | null> => {
      if (parent.restaurant_id) {
        return context.restaurantItemRestaurant.load(parent.restaurant_id);
      } else {
        return null;
      }
    },
    restaurantItemUserRatings: async (
      parent: RestaurantItemType,
      args: any,
    ) => {
      if (parent.id === 123) {
        console.log('testtttt');
      }
      return parent.restaurantItemUserRatings || [];
    },
    restaurantItemRestImages: async (parent: RestaurantItemType) => {
      return parent.restaurantItemRestImages || [];
    },
  },
  Mutation: {
    addRestaurant: async (
      _parent: any,
      args: createRestaurantArgInput,
      context: any,
    ): Promise<RestaurantType> => {
      if (!context.user) {
        //check authtenthication
      }
      const { input } = args;
      return await RestaurantServices.create({ ...input });
    },
  },
};

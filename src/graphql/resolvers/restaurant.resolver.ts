import RestaurantServices from 'services/restaurants.service';
import OpenAiResturant from 'services/openAi.service';
import { IResolvers } from '@graphql-tools/utils'; // or your GraphQL resolver typings
import {
  RestaurantType,
  RestaurantItemType,
  RestaurantMenuItemsAIResponse,
  createRestaurantArgInput,
  RestaurantAIResponse,
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
    restaurantItemRestImages: (): any[] => {
      return [];
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

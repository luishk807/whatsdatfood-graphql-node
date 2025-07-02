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
    restaurantBySlug: async (
      _parent: any,
      args: { slug: string },
    ): Promise<RestaurantsOutput | null> => {
      const resp = await RestaurantServices.findBySlug(args.slug);
      if (!resp) {
        throw new NotFoundError('Restaurant not found');
      }
      return resp;
    },
    restaurantByName: async (
      _parent: any,
      args: { name: string },
    ): Promise<RestaurantsOutput | null> => {
      const resp = await RestaurantServices.findByName(args.name);
      if (!resp) {
        throw new NotFoundError('Restaurant not found');
      }
      return resp;
    },
    aiRestaurant: async (
      _parent: any,
      _args: { name: string },
      context: {
        aiRestaurant: DataLoader<string, RestaurantAIResponse[]>;
      },
    ) => {
      return context.aiRestaurant.load(_args.name);
    },
    // aiRestaurantBySlug: async (
    //   _parent: any,
    //   args: { slug: string },
    //   context: {
    //     aiRestaurantBySlug: DataLoader<string, RestaurantAIResponse[]>;
    //   },
    // ): Promise<RestaurantsOutput | null> => {
    //   return context.aiRestaurantBySlug.load(args.slug);
    // },
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
  RestaurantMenuItems: {
    restaurant: async (
      parent: RestaurantItemType,
      _args: any,
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
    images: (): any[] => {
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

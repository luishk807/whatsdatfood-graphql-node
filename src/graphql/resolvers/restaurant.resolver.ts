import RestaurantServices from '../../services/restaurants.service';
import { RestaurantsInput } from '../../db/models/restaurants';

export const restaurantResolvers = {
  Query: {
    restaurants: async () => await RestaurantServices.getAll(),
    restaurantBySlug: async (slug: string) =>
      await RestaurantServices.findBySlug(slug),
    restaurantByName: async (name: string) =>
      await RestaurantServices.findByName(name),
  },
  Mutation: {
    restaurantCreate: async (_parent: any, args: RestaurantsInput) => {
      return await RestaurantServices.create({ ...args });
    },
  },
};

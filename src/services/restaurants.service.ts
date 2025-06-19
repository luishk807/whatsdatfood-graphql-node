import { RestaurantsInput } from '../db/models/restaurants';
import Restaurants from '../repository/restaurants.respository';

const restRepo = new Restaurants();

const RestaurantServices = {
  async create(payload: RestaurantsInput) {
    return await restRepo.create(payload);
  },

  async getAll() {
    return await restRepo.getAll();
  },

  async findByName(name: string, page?: number, limit?: number) {
    return await restRepo.findByName(name, page, limit);
  },
  async findBySlug(slug: string) {
    return await restRepo.findBySlug(slug);
  },
};

export default RestaurantServices;

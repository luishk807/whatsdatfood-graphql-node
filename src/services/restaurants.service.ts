import { RestaurantsInput } from '../db/models/restaurants';
import Restaurants from '../repository/restaurants.respository';

const restRepo = new Restaurants();

const RestaurantServices = {
  async create(payload: RestaurantsInput) {
    console.log('heee', payload);
    return await restRepo.create(payload);
  },

  async getAll() {
    return await restRepo.getAll();
  },

  async findByName(name: string, page: number, limit: number) {
    return await restRepo.findByName(name, page, limit);
  },
};

export default RestaurantServices;

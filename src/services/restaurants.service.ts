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
};

export default RestaurantServices;

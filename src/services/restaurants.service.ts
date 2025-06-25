import { RestaurantsInput } from 'db/models/restaurants';
import Restaurants from 'repository/restaurants.respository';
import { buildRestaurantPayload } from 'helpers/restaurants.sequelize';
const restRepo = new Restaurants();

const RestaurantServices = {
  async create(payload: RestaurantsInput) {
    const new_payload = buildRestaurantPayload(payload);
    return await restRepo.create(new_payload);
  },

  async getAll() {
    return await restRepo.getAll();
  },

  async findById(id: number) {
    return await restRepo.getOneById(id);
  },

  async findByName(name: string, page?: number, limit?: number) {
    return await restRepo.findByName(name, page, limit);
  },
  async findBySlug(slug: string) {
    return await restRepo.findBySlug(slug);
  },
};

export default RestaurantServices;

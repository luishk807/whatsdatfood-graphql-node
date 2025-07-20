import { RestaurantsInput } from 'db/models/restaurants';
import Restaurants from 'repository/restaurants.respository';
import {
  buildRestaurantPayload,
  buildRestaurantResponse,
} from 'helpers/restaurants.sequelize';
import { RestaurantResponseType, RestaurantType } from 'types/restaurant';
const restRepo = new Restaurants();

const RestaurantServices = {
  async create(payload: RestaurantsInput) {
    const resp = buildRestaurantPayload(payload);
    return await restRepo.create(resp);
  },

  async getAll() {
    const resp = await restRepo.getAll();
    return buildRestaurantResponse(resp);
  },

  async findById(id: number) {
    const resp = await restRepo.getOneById(id);
    const data = buildRestaurantResponse(resp);
    return Array.isArray(data) ? data[0] : data;
  },

  async findByName(name: string, page?: number, limit?: number) {
    const resp = await restRepo.findByName(name, page, limit);
    return buildRestaurantResponse(resp);
  },
  async findBySlug(
    slug: string,
  ): Promise<RestaurantResponseType | RestaurantResponseType[]> {
    const resp = await restRepo.findBySlug(slug);
    return buildRestaurantResponse(resp);
  },
};

export default RestaurantServices;

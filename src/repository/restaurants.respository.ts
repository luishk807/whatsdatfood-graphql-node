import Base from './base.repository';
import { RestaurantsInput } from '../db/models/restaurants';
import Restaurants from '../db/models/restaurants';
class RestaurantsRepo extends Base {
  constructor() {
    super(Restaurants);
  }

  async create(payload: RestaurantsInput) {
    return await this.model.upsert(payload);
  }
}

export default RestaurantsRepo;

import Base from './base.repository';
import { RestaurantMenuItemsInput } from '../db/models/restaurantMenuItems';
import RestaurantMenuItems from '../db/models/restaurantMenuItems';

class RestaurantMenuItemsRepo extends Base {
  constructor() {
    super(RestaurantMenuItems);
  }

  async create(payload: RestaurantMenuItemsInput) {
    return await this.model.upsert(payload);
  }
}

export default RestaurantMenuItemsRepo;

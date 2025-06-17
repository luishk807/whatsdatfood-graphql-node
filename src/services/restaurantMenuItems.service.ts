import RestaurantMenuItems from '../repository/restaurantMenu.repository';
import { RestaurantMenuItemsInput } from '../db/models/restaurantMenuItems';

const RestaurantItemRepo = new RestaurantMenuItems();

const RestaurantMenuItemsFn = {
  async create(payload: RestaurantMenuItemsInput) {
    return await RestaurantItemRepo.create(payload);
  },
  async getAll() {
    return await RestaurantItemRepo.getAll();
  },
};

export default RestaurantMenuItemsFn;

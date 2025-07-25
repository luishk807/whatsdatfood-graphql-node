import RestaurantMenuItems from 'repository/restaurantMenu.repository';
import { RestaurantMenuItemsInput } from 'db/models/restaurantMenuItems';

const RestaurantItemRepo = new RestaurantMenuItems();

const RestaurantMenuItemsFn = {
  async create(payload: RestaurantMenuItemsInput) {
    return await RestaurantItemRepo.create<RestaurantMenuItemsInput>(payload);
  },
  async destroyItemByRestaurantId(id: number) {
    return await RestaurantItemRepo.destroyItemsByRestaurantId(id);
  },
  async bulkCreate(payload: RestaurantMenuItemsInput[]) {
    return await RestaurantItemRepo.bulkCreate<RestaurantMenuItemsInput>(
      payload,
    );
  },
  async findById(id: number) {
    return await RestaurantItemRepo.getOneById(id);
  },
  async findByQuery(query: RestaurantMenuItemsInput) {
    return await RestaurantItemRepo.findByQuery(query);
  },
  async findItemsByRestaurantId(id: number, limit?: number, offset?: number) {
    return await RestaurantItemRepo.findAllItemsByRestaurantId(
      id,
      limit,
      offset,
    );
  },
  async findAllById(id: number) {
    return await RestaurantItemRepo.getOneById(id);
  },
  async getAll() {
    return await RestaurantItemRepo.getAll();
  },
};

export default RestaurantMenuItemsFn;

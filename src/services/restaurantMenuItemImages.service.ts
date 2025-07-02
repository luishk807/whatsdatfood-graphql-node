import RestaurantMenuItemImages from 'repository/restaurantMenuImages.repository';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';

const RestaurantItemImageRepo = new RestaurantMenuItemImages();

const RestaurantMenuItemImagesFn = {
  async create(payload: RestaurantMenuItemImagesInput) {
    return await RestaurantItemImageRepo.create(payload);
  },
  async destroyItemByRestaurantId(id: number) {
    return await RestaurantItemImageRepo.destroyItemsByRestaurantId(id);
  },
  async bulkCreate(payload: RestaurantMenuItemImagesInput[]) {
    return await RestaurantItemImageRepo.bulkCreate(payload);
  },
  async findById(id: number) {
    return await RestaurantItemImageRepo.getOneById(id);
  },
  async findItemImagesByRestItemId(
    id: number,
    limit?: number,
    offset?: number,
  ) {
    return await RestaurantItemImageRepo.findAllItemImagesByRestItemId(
      id,
      limit,
      offset,
    );
  },
  async findAllById(id: number) {
    return await RestaurantItemImageRepo.getOneById(id);
  },
  async getAll() {
    return await RestaurantItemImageRepo.getAll();
  },
};

export default RestaurantMenuItemImagesFn;

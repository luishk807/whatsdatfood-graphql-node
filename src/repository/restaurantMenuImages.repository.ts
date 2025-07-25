import Base from 'repository/base.repository';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';
import RestaurantMenuItemImages from 'db/models/restaurantMenuItemImages';
import db from 'db/models';
import { dbAliases } from 'db/index';
class RestaurantMenuItemsRepo extends Base {
  constructor() {
    super(RestaurantMenuItemImages);
  }
  async findByRestItemId(id: number) {
    return await this.model.findOne({
      where: {
        restaurant_menu_item_id: id,
      },
      include: {
        model: db.RestaurantMenuItems,
        as: dbAliases.restaurantItemImages.restaurantItem,
      },
    });
  }
  async findByFlickrId(id: number) {
    return await this.model.findOne({
      where: {
        flickr_id: id,
      },
      include: {
        model: db.RestaurantMenuItems,
        as: dbAliases.restaurantItemImages.restaurantItem,
      },
    });
  }

  async destroyItemsByRestaurantId(id: number) {
    return await this.model.destroy({
      restaurant_id: id,
    });
  }
}

export default RestaurantMenuItemsRepo;

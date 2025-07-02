import Base from 'repository/base.repository';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';
import RestaurantMenuItemImages from 'db/models/restaurantMenuItemImages';
import { LIMIT, PAGE } from 'constants/sequelize';
import db from 'db/models';
import { dbAliases } from 'db/index';
import { getPageOffset } from 'helpers/sequelize';
class RestaurantMenuItemsRepo extends Base {
  constructor() {
    super(RestaurantMenuItemImages);
  }
  async findAllItemImagesByRestItemId(
    id: number,
    limit: number = LIMIT,
    page: number = PAGE,
  ) {
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      where: {
        restaurant_menu_item_id: id,
      },
      include: {
        model: db.RestaurantMenuItems,
        as: dbAliases.restaurantItemImages.restaurantItem,
      },
      limit: limit,
      offset: offset,
    });
  }

  async destroyItemsByRestaurantId(id: number) {
    return await this.model.destroy({
      restaurant_id: id,
    });
  }

  async create(payload: RestaurantMenuItemImagesInput) {
    const t = await db.sequelize.transaction();

    try {
      const resp = await this.model.upsert(payload, { transaction: t });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
  async bulkCreate(payload: RestaurantMenuItemImagesInput[]) {
    const t = await db.sequelize.transaction();

    try {
      const resp = await this.model.bulkCreate(payload, {
        transaction: t,
        returning: true,
      });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
}

export default RestaurantMenuItemsRepo;

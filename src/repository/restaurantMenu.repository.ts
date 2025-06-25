import Base from './base.repository';
import { RestaurantMenuItemsInput } from '../db/models/restaurantMenuItems';
import RestaurantMenuItems from '../db/models/restaurantMenuItems';
import { LIMIT } from '../constants/sequelize';
import db from '../db/models';
import { getPageOffset } from '../helpers/sequelize';
class RestaurantMenuItemsRepo extends Base {
  constructor() {
    super(RestaurantMenuItems);
  }

  async findAllItemsByRestaurantId(
    id: number,
    limit: number = LIMIT,
    page: number = 1,
  ) {
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      where: {
        restaurant_id: id,
      },
      limit: limit,
      offset: offset,
    });
  }
  async create(payload: RestaurantMenuItemsInput) {
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
}

export default RestaurantMenuItemsRepo;

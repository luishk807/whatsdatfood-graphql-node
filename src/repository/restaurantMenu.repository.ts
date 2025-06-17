import Base from './base.repository';
import { RestaurantMenuItemsInput } from '../db/models/restaurantMenuItems';
import RestaurantMenuItems from '../db/models/restaurantMenuItems';
import db from '../db/models';

class RestaurantMenuItemsRepo extends Base {
  constructor() {
    super(RestaurantMenuItems);
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

import Base from './base.repository';
import { RestaurantsInput } from '../db/models/restaurants';
import Restaurants from '../db/models/restaurants';
import db from '../db/models';
class RestaurantsRepo extends Base {
  constructor() {
    super(Restaurants);
  }

  async create(payload: RestaurantsInput) {
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

export default RestaurantsRepo;

import Base from './base.repository';
import { Op } from 'sequelize';
import { RestaurantsInput } from '../db/models/restaurants';
import Restaurants from '../db/models/restaurants';
import db from '../db/models';
import { LIMIT, OFFSET } from '../constants/sequelize';
import { getPageOffset } from '../utils/sequelize';
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

  async findByName(name: string, limit: number = LIMIT, page: number = OFFSET) {
    const offset = getPageOffset(limit, page);
    console.log('j', name);
    return await this.model.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
      offset: offset,
    });
  }
}

export default RestaurantsRepo;

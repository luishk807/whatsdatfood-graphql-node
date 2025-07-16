import Base from './base.repository';
import db from '../db/models/index';

import { UserRatingsInput } from 'db/models/userRatings';
import UserRatings from 'db/models/userRatings';
import { dbAliases } from 'db/index';

class UserRatingRepo extends Base {
  constructor() {
    super(UserRatings);
  }

  async create(payload: UserRatingsInput) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.upsert(payload, {
        transaction: t,
        returning: true,
      });
      console.log(resp);
      await t.commit();
      return resp[0];
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.restaurantItems.userRatings,
        },
      ],
    });
  }
  async update(payload: UserRatingsInput) {
    console.log('update user rating', payload);
    const t = await db.sequelize.transaction();
    try {
      const [affectedCount, updatedRows] = await this.model.update(payload, {
        where: {
          id: payload.id,
        },
        transaction: t,
        returning: true,
      });
      if (affectedCount === 0) {
        throw new Error(`No UserRating found with id ${payload.id}`);
      }

      await t.commit();
      return updatedRows[0]; // return the updated instance
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
}

export default UserRatingRepo;

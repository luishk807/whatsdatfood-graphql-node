import Base from './base.repository';
import db from '../db/models/index';

import { RestaurantBusinessHoursInput } from 'db/models/restaurantBusinessHours';
import RestaurantBusinessHours from 'db/models/restaurantBusinessHours';
import { dbAliases } from 'db/index';

class UserRatingRepo extends Base {
  constructor() {
    super(RestaurantBusinessHours);
  }

  async deleteFromRestaurantId(id: number) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.destroy({
        where: {
          restaurant_id: id,
        },
        transaction: t,
        force: true,
      });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      if (err instanceof Error) {
        return err.message;
      }
      throw new Error('ERROR: unable to delete business hours');
    }
  }
  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: db.Restaurants,
          as: dbAliases.restaurantBusinessHours.restaurant,
        },
        {
          model: db.Statuses,
          as: dbAliases.restaurantBusinessHours.status,
        },
      ],
    });
  }
}

export default UserRatingRepo;

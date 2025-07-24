import Base from './base.repository';
import db from '../db/models/index';

import { RestaurantBusinessHoursInput } from 'db/models/restaurantBusinessHours';
import RestaurantBusinessHours from 'db/models/restaurantBusinessHours';
import { dbAliases } from 'db/index';

class UserRatingRepo extends Base {
  constructor() {
    super(RestaurantBusinessHours);
  }

  async create(payload: RestaurantBusinessHoursInput) {
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
  async bulkCreate(payload: RestaurantBusinessHoursInput[]) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.bulkCreate(payload, {
        transaction: t,
        returning: true,
      });
      await t.commit();
      return resp[0];
    } catch (err) {
      await t.rollback();
      return err;
    }
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
  async update(payload: RestaurantBusinessHoursInput) {
    console.log('update businss hours', payload);
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
        throw new Error(`No Business hours found with id ${payload.id}`);
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

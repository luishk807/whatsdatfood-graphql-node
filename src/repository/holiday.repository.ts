import Base from './base.repository';
import db from '../db/models/index';

import { HolidaysInput } from 'db/models/holidays';
import Holiday from 'db/models/holidays';
import { dbAliases } from 'db/index';

class HolidayRepo extends Base {
  constructor() {
    super(Holiday);
  }

  async deleteByRestaurantId(id: number) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.destroy({
        where: {
          restaurant_id: id,
        },
        force: true,
        transaction: t,
      });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: db.Statuses,
          as: dbAliases.holidays.status,
        },
      ],
    });
  }
}

export default HolidayRepo;

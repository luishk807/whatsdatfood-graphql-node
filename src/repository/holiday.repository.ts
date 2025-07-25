import Base from './base.repository';
import db from '../db/models/index';

import { HolidaysInput } from 'db/models/holidays';
import Holiday from 'db/models/holidays';
import { dbAliases } from 'db/index';

class HolidayRepo extends Base {
  constructor() {
    super(Holiday);
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

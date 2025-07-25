import Base from './base.repository';
import db from '../db/models/index';

import RestaurantHolidays from 'db/models/restaurantHolidays';
import { dbAliases } from 'db/index';

class RestaurantHoliday extends Base {
  constructor() {
    super(RestaurantHolidays);
  }

  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: db.Statuses,
          as: dbAliases.restaurantHoliday.status,
        },
      ],
    });
  }
}

export default RestaurantHoliday;

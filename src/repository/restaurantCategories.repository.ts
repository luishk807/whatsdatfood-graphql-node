import Base from './base.repository';
import db from '../db/models/index';

import RestaurantCategories from 'db/models/restaurantCategories';
import { dbAliases } from 'db/index';

class RestaurantHoliday extends Base {
  constructor() {
    super(RestaurantCategories);
  }

  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: db.Statuses,
          as: dbAliases.restaurantCategories.status,
        },
      ],
    });
  }
}

export default RestaurantHoliday;

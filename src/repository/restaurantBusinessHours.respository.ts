import Base from './base.repository';
import db from '../db/models/index';

import { RestaurantBusinessHoursInput } from 'db/models/restaurantBusinessHours';
import RestaurantBusinessHours from 'db/models/restaurantBusinessHours';
import { dbAliases } from 'db/index';

class UserRatingRepo extends Base {
  constructor() {
    super(RestaurantBusinessHours);
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

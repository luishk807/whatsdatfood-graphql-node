import Base from './base.repository';
import db from '../db/models/index';

import { UserRatingsInput } from 'db/models/userRatings';
import UserRatings from 'db/models/userRatings';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';

class UserRatingRepo extends Base {
  constructor() {
    super(UserRatings);
  }

  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.userRatings.restaurantItem,
        },
        {
          model: db.Users,
          as: dbAliases.userRatings.user,
        },
        {
          model: db.Statuses,
          as: dbAliases.userRatings.status,
        },
      ],
    });
  }
}

export default UserRatingRepo;

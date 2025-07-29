import Base from './base.repository';
import db from '../db/models/index';

import UserRatings from 'db/models/userRatings';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT } from 'constants/sequelize';

class UserRatingRepo extends Base {
  constructor() {
    super(UserRatings);
  }

  async getOneByUserAndRestItemId(userId: number, restItemId: number) {
    return await this.model.findOne({
      where: {
        restaurant_menu_item_id: restItemId,
        user_id: userId,
      },
    });
  }

  async getAllByRestItemId(restItemId: number, page: number, limit?: number) {
    const offset = getPageOffset(LIMIT, page);
    return await this.model.findAndCountAll({
      where: {
        restaurant_menu_item_id: restItemId,
      },
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
      limit: limit || LIMIT,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
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

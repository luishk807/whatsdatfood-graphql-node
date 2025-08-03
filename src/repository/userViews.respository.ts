import Base from './base.repository';
import db from '../db/models/index';

import UserViews from 'db/models/userViews';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT, PAGE } from 'constants/sequelize';

class UserViewRepo extends Base {
  constructor() {
    super(UserViews);
  }

  async getAll(page?: number, limit?: number) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      include: [
        {
          model: db.Restaurants,
          as: dbAliases.userViews.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userViews.user,
        },
      ],
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
  async getAllByRestaurantId(
    restaurantId: number,
    page?: number,
    limit?: number,
  ) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      where: {
        restaurant_id: restaurantId,
      },
      include: [
        {
          model: db.Restaurants,
          as: dbAliases.userViews.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userViews.user,
        },
      ],
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
  async getAllByUser(userId: number, page?: number, limit?: number) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: db.Restaurants,
          as: dbAliases.userViews.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userViews.user,
        },
      ],
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
}

export default UserViewRepo;

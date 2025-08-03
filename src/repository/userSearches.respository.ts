import Base from './base.repository';
import db from '../db/models/index';

import UserSearches from 'db/models/userSearches';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT, PAGE } from 'constants/sequelize';

class UserSearchRepo extends Base {
  constructor() {
    super(UserSearches);
  }

  async getAll(page?: number, limit?: number) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      include: [
        {
          model: db.UserSearchTypes,
          as: dbAliases.userSearches.userSearchTypes,
        },
        {
          model: db.Restaurants,
          as: dbAliases.userSearches.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userSearches.user,
        },
      ],
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
  async getAllByResturantId(
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
          model: db.UserSearchTypes,
          as: dbAliases.userSearches.userSearchTypes,
        },
        {
          model: db.Restaurants,
          as: dbAliases.userSearches.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userSearches.user,
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
          model: db.UserSearchTypes,
          as: dbAliases.userSearches.userSearchTypes,
        },
        {
          model: db.Restaurants,
          as: dbAliases.userSearches.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userSearches.user,
        },
      ],
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
}

export default UserSearchRepo;

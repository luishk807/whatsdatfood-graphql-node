import Base from './base.repository';
import db from '../db/models/index';

import UserRatings from 'db/models/userRatings';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT, PAGE } from 'constants/sequelize';

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

  async getAllByUserId(userId: number, page?: number, limit?: number) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.userRatings.restaurantItem,
          include: [
            {
              model: db.Restaurants,
              as: dbAliases.restaurantItems.restaurant,
            },
            {
              model: db.RestaurantMenuItemImages,
              as: dbAliases.restaurantItems.restaurantItemImages,
            },
          ],
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
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }

  async getAllByRestItemId(restItemId: number, page: number, limit?: number) {
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      where: {
        restaurant_menu_item_id: restItemId,
      },
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.userRatings.restaurantItem,
          include: [
            {
              model: db.Restaurants,
              as: dbAliases.restaurantItems.restaurant,
            },
            {
              model: db.RestaurantMenuItemImages,
              as: dbAliases.restaurantItems.restaurantItemImages,
            },
          ],
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
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }

  async getAll(page?: number, limit?: number) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
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
      limit: limit,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
}

export default UserRatingRepo;

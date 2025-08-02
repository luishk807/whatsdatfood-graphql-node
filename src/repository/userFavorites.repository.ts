import Base from './base.repository';
import db from '../db/models/index';

import UserFavorites from 'db/models/userFavorites';
import { UserFavorites as UserFavoriteInt } from 'interfaces/user';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT, PAGE } from 'constants/sequelize';
class UserFavoritesRepo extends Base {
  constructor() {
    super(UserFavorites);
  }

  async checkIsFavorite(restId: number, userId: number) {
    try {
      const resp = await this.model.findOne({
        where: {
          restaurant_id: restId,
          user_id: userId,
        },
      });

      return resp ? true : false;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`ERROR: ${err.message}`);
      }

      throw new Error('ERROR: unable to check favorites');
    }
  }

  async createOrUpdateFavorite(payload: UserFavoriteInt) {
    const t = await db.sequelize.transaction();

    const userId = _get(payload, 'user_id');
    const restId = _get(payload, 'restaurant_id');

    if (!userId || !restId) {
      throw new Error('User info and restaurant Info Required');
    }
    try {
      const find = await this.model.findOne({
        where: {
          user_id: userId,
          restaurant_id: restId,
        },
      });

      if (!find) {
        console.log('not found');
        const resp = await this.model.upsert(payload, {
          transaction: t,
          returning: true,
        });
        await t.commit();
        return resp[0];
      } else {
        console.log('found');
        await this.removeById(find.id);
        return find;
      }
    } catch (err) {
      await t.rollback();
      this.handlerError(err);
    }
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
          model: db.Restaurants,
          as: dbAliases.userFavorites.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userFavorites.user,
        },
      ],
      limit: limit || LIMIT,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
  async getAll(page?: number, limit?: number) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      include: [
        {
          model: db.Restaurants,
          as: dbAliases.userFavorites.restaurant,
        },
        {
          model: db.Users,
          as: dbAliases.userFavorites.user,
        },
      ],
      limit: limit || LIMIT,
      offset: offset,
      order: [['createdAt', 'desc']],
    });
  }
}

export default UserFavoritesRepo;

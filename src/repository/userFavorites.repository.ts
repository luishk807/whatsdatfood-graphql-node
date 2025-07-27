import Base from './base.repository';
import db from '../db/models/index';

import UserFavorites from 'db/models/userFavorites';
import { UserFavorites as UserFavoriteInt } from 'interfaces/user';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';

class UserFavoritesRepo extends Base {
  constructor() {
    super(UserFavorites);
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
  async getAll() {
    return await this.model.findAll({
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
    });
  }
}

export default UserFavoritesRepo;

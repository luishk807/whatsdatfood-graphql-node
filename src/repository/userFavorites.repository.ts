import Base from './base.repository';
import db from '../db/models/index';

import UserFavorites from 'db/models/userFavorites';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';

class UserFavoritesRepo extends Base {
  constructor() {
    super(UserFavorites);
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

import Base from './base.repository';
import db from '../db/models/index';

import UserFriends from 'db/models/userFriends';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT } from 'constants/sequelize';

class UserFriendsRepo extends Base {
  constructor() {
    super(UserFriends);
  }

  async getAllByUserId(userId: number, page: number, limit?: number) {
    const offset = getPageOffset(LIMIT, page);
    return await this.model.findAndCountAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: db.Users,
          as: dbAliases.userFriends.user,
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
          model: db.Users,
          as: dbAliases.userFriends.user,
        },
      ],
    });
  }
}

export default UserFriendsRepo;

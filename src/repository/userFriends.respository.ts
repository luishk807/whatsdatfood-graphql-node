import Base from './base.repository';
import db from '../db/models/index';

import UserFriends from 'db/models/userFriends';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT, PAGE } from 'constants/sequelize';

class UserFriendsRepo extends Base {
  constructor() {
    super(UserFriends);
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
          model: db.Users,
          as: dbAliases.userFriends.user,
        },
      ],
      limit: limit,
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

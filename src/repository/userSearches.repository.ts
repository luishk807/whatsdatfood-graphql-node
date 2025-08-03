import Base from './base.repository';
import db from '../db/models/index';
import { Op } from 'sequelize';
import UserSearches from 'db/models/userSearches';
import { dbAliases } from 'db/index';
import { _get } from 'helpers';
import { getPageOffset } from 'helpers/sequelize';
import { LIMIT, PAGE } from 'constants/sequelize';
import { todayDates } from 'helpers';

class UserSearchRepo extends Base {
  constructor() {
    super(UserSearches);
  }

  async checkIfExists(userId: number, name: string, isToday?: boolean) {
    const dates = todayDates();
    return await this.model.findOne({
      where: {
        user_id: userId,
        name: {
          [Op.iLike]: name,
        },
        ...(isToday && {
          createdAt: {
            [Op.between]: [dates.startOftoday, dates.endOftoday],
          },
        }),
      },
    });
  }

  async getAll(page?: number, limit?: number) {
    page = page || PAGE;
    limit = limit || LIMIT;
    const offset = getPageOffset(limit, page);
    return await this.model.findAndCountAll({
      include: [
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

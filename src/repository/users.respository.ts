import Base from './base.repository';
import db from '../db/models/index';

import { UserInput } from '../db/models/users';
import Users from '../db/models/users';
import { includes } from 'lodash';
import { dbAliases } from 'db';

class UsersRepo extends Base {
  constructor() {
    super(Users);
  }

  async create(payload: UserInput) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.upsert(payload, { transaction: t });
      console.log(resp);
      await t.commit();
      return resp[0];
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
  async findUserByEmail(email: string): Promise<Users | null> {
    const findUser = await this.model.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: db.UserRoles,
          as: dbAliases.users.userRole,
        },
        {
          model: db.UserRatings,
          as: dbAliases.users.userRatings,
        },
        {
          model: db.Statuses,
          as: dbAliases.users.status,
        },
      ],
    });

    return findUser ? findUser : null;
  }
  async findUserByUsername(username: string): Promise<Users | null> {
    const findUser = await this.model.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: db.UserRoles,
          as: dbAliases.users.userRole,
        },
        {
          model: db.UserRatings,
          as: dbAliases.users.userRatings,
        },
        {
          model: db.Statuses,
          as: dbAliases.users.status,
        },
      ],
    });

    return findUser ? findUser : null;
  }
}

export default UsersRepo;

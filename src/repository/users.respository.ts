import Base from './base.repository';
import db from '../db/models/index';

import { UserInput } from '../db/models/users';
import Users from '../db/models/users';

class UsersRepo extends Base {
  constructor() {
    super(Users);
  }

  async create(payload: UserInput) {
    const t = db.sequelize.transaction();
    try {
      const resp = await this.model.upsert(payload);
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
}

export default UsersRepo;

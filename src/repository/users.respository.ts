import Base from './base.repository';

import { UserInput } from '../db/models/users';
import Users from '../db/models/users';

class UsersRepo extends Base {
  constructor() {
    super(Users);
  }

  async create(payload: UserInput) {
    return await this.model.upsert(payload);
  }
}

export default UsersRepo;

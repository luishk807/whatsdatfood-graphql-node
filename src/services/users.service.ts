import { UserInput } from '../db/models/users';
import Users from '../repository/users.respository';

const UserRepo = new Users();

const UserServices = {
  async create(payload: UserInput) {
    return await UserRepo.create(payload);
  },
  async getAll() {
    return await UserRepo.getAll();
  },
};

export default UserServices;

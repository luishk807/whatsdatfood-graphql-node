import { UserInput } from 'db/models/users';
import Users from 'repository/users.respository';
import { buildUserEntry, buildUserResponse } from 'helpers/users.sequelize';
import { _get } from 'helpers';
import { dbAliases } from 'db';
import { User } from 'interfaces/user';
const UserRepo = new Users();

const UserServices = {
  async create(payload: UserInput) {
    const new_payload = await buildUserEntry(payload);
    return await UserRepo.create(new_payload);
  },
  async findById(id: number) {
    const resp = await UserRepo.getOneById(id);
    return buildUserResponse(resp as User);
  },
  async findByEmail(email: string) {
    const resp = await UserRepo.findUserBy('email', email);
    return buildUserResponse(resp as User);
  },
  async findByUsername(username: string) {
    const resp = await UserRepo.findUserBy('username', username);
    return buildUserResponse(resp as User);
  },
  async getAll() {
    const resp = await UserRepo.getAll();
    return buildUserResponse(resp as User);
  },
};

export default UserServices;

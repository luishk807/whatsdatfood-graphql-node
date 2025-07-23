import { UserInput } from 'db/models/users';
import Users from 'repository/users.respository';
import { buildUserPayload, buildUserResponse } from 'helpers/users.sequelize';
import { _get } from 'helpers';
import { dbAliases } from 'db';
import { UserType } from 'interfaces/user';
const UserRepo = new Users();

const UserServices = {
  async create(payload: UserInput) {
    const new_payload = await buildUserPayload(payload);
    return await UserRepo.create(new_payload);
  },
  async findById(id: number) {
    const resp = await UserRepo.getOneById(id);
    return buildUserResponse(resp as UserType);
  },
  async findByEmail(email: string) {
    const resp = await UserRepo.findUserByEmail(email);
    return buildUserResponse(resp as UserType);
  },
  async findByUsername(username: string) {
    const resp = await UserRepo.findUserByUsername(username);
    return buildUserResponse(resp as UserType);
  },
  async getAll() {
    const resp = await UserRepo.getAll();
    return buildUserResponse(resp as UserType);
  },
};

export default UserServices;

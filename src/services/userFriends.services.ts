import { UserFriendsInput } from 'db/models/userFriends';
import { buildUserFriendsResponse } from 'helpers/users.sequelize';
import UserFriends from 'repository/userFriends.respository';
import { LIMIT } from 'constants/sequelize';
const UserFriendRepo = new UserFriends();

const UserFriendServices = {
  async create(payload: UserFriendsInput) {
    return await UserFriendRepo.create<UserFriendsInput>(payload);
  },
  async update(payload: UserFriendsInput) {
    return await UserFriendRepo.update<UserFriendsInput>(payload);
  },
  async deleteById(id: number) {
    return await UserFriendRepo.deleteById(id);
  },
  async removeById(id: number) {
    return await UserFriendRepo.removeById(id);
  },
  async findById(id: number) {
    return await UserFriendRepo.getOneById(id);
  },
  async getAll() {
    const resp = await UserFriendRepo.getAll();
    return buildUserFriendsResponse(resp);
  },
  async getAllByUserId(userId: number, page: number, limit?: number) {
    const resp = await UserFriendRepo.getAllByUserId(userId, page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = await buildUserFriendsResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
};

export default UserFriendServices;

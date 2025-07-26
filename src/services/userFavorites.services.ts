import { UserFavoritesInput } from 'db/models/userFavorites';
import { buildUserFavoritesResponse } from 'helpers/users.sequelize';
import UserFavoritesRepository from 'repository/userFavorites.repository';
const UserFavoritesRepo = new UserFavoritesRepository();

const UserFavoriteServices = {
  async create(payload: UserFavoritesInput) {
    return await UserFavoritesRepo.create<UserFavoritesInput>(payload);
  },
  async update(payload: UserFavoritesInput) {
    return await UserFavoritesRepo.update<UserFavoritesInput>(payload);
  },
  async createOrUpdate(payload: UserFavoritesInput) {
    return await UserFavoritesRepo.createOrUpdate<UserFavoritesInput>(payload);
  },
  async deleteById(id: number) {
    return await UserFavoritesRepo.deleteById(id);
  },
  async findById(id: number) {
    return await UserFavoritesRepo.getOneById(id);
  },
  async getAll() {
    const resp = await UserFavoritesRepo.getAll();
    return buildUserFavoritesResponse(resp);
  },
};

export default UserFavoriteServices;

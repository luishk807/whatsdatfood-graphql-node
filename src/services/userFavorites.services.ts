import { UserFavoritesInput } from 'db/models/userFavorites';
import { buildUserFavoritesResponse } from 'helpers/users.sequelize';
import UserFavoritesRepository from 'repository/userFavorites.repository';
import RestaurantServices from 'services/restaurants.service';
const UserFavoritesRepo = new UserFavoritesRepository();

const UserFavoriteServices = {
  async create(payload: UserFavoritesInput) {
    return await UserFavoritesRepo.create<UserFavoritesInput>(payload);
  },
  async update(payload: UserFavoritesInput) {
    return await UserFavoritesRepo.update<UserFavoritesInput>(payload);
  },
  async createOrUpdateFavorite(slug: string, userId: number) {
    const rest = await RestaurantServices.findBySlug(slug as string);
    return await UserFavoritesRepo.createOrUpdateFavorite({
      restaurant_id: Array.isArray(rest) ? rest[0].id : rest.id,
      user_id: userId,
    });
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

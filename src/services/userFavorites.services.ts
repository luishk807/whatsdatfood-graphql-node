import { UserFavoritesInput } from 'db/models/userFavorites';
import { buildUserFavoritesResponse } from 'helpers/users.sequelize';
import UserFavoritesRepository from 'repository/userFavorites.repository';
import RestaurantServices from 'services/restaurants.service';
import { LIMIT } from 'constants/sequelize';
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
  async checkIsFavorite(slug: string, userId: number) {
    const rest = await RestaurantServices.findBySlug(slug as string);
    const restId = Number(Array.isArray(rest) ? rest[0].id : rest.id);
    return await UserFavoritesRepo.checkIsFavorite(restId, userId);
  },
  async deleteById(id: number) {
    return await UserFavoritesRepo.deleteById(id);
  },
  async findById(id: number) {
    return await UserFavoritesRepo.getOneById(id);
  },
  async getAllByUserId(userId: number, page?: number, limit?: number) {
    const resp = await UserFavoritesRepo.getAllByUserId(userId, page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = buildUserFavoritesResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
  async getAll(page?: number, limit?: number) {
    const resp = await UserFavoritesRepo.getAll(page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = buildUserFavoritesResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
};

export default UserFavoriteServices;

import { UserRatingsInput } from 'db/models/userRatings';
import { buildUserRatingResponse } from 'helpers/users.sequelize';
import UserRating from 'repository/userRating.repository';
import { LIMIT, PAGE } from 'constants/sequelize';
const UserRatingRepo = new UserRating();

const UserServices = {
  async create(payload: UserRatingsInput) {
    return await UserRatingRepo.create<UserRatingsInput>(payload);
  },
  async createOrUpdate(payload: UserRatingsInput) {
    return await UserRatingRepo.createOrUpdate<UserRatingsInput>(payload);
  },
  async update(payload: UserRatingsInput) {
    return await UserRatingRepo.update<UserRatingsInput>(payload);
  },
  async deleteById(id: number) {
    return await UserRatingRepo.deleteById(id);
  },
  async findById(id: number) {
    return await UserRatingRepo.getOneById(id);
  },
  async findByUserAndRestItemId(userId: number, restItemId: number) {
    return await UserRatingRepo.getOneByUserAndRestItemId(userId, restItemId);
  },
  async getAll(page?: number, limit?: number) {
    const resp = await UserRatingRepo.getAll(page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = await buildUserRatingResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },

  async getAllByUserId(userId: number, page?: number, limit?: number) {
    const resp = await UserRatingRepo.getAllByUserId(userId, page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = await buildUserRatingResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },

  async getAllByRestItemId(restItemId: number, page: number) {
    const resp = await UserRatingRepo.getAllByRestItemId(restItemId, page);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = await buildUserRatingResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
};

export default UserServices;

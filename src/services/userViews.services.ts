import { UserViewsInput } from 'db/models/userViews';
import UserView from 'repository/userViews.respository';
import {
  buildUserViewEntry,
  buildUserViewResponse,
} from 'helpers/users.sequelize';
import { _get } from 'helpers';

import { LIMIT } from 'constants/sequelize';
const UserViewsRepo = new UserView();

const UserViewServices = {
  async create(payload: UserViewsInput) {
    const new_payload = await buildUserViewEntry(payload);
    const isExists = await this.checkIfExists(
      new_payload.user_id,
      new_payload.restaurant_id,
      true,
    );

    console.log('isExists viewws', isExists);
    if (isExists) {
      return null;
    }
    return await UserViewsRepo.create<UserViewsInput>(new_payload);
  },
  async checkIfExists(userId: number, restId: number, isToday?: boolean) {
    return await UserViewsRepo.checkIfExists(userId, restId, isToday);
  },
  async getAllByRestaurantId(restId: number, page?: number, limit?: number) {
    const resp = await UserViewsRepo.getAllByRestaurantId(restId, page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = buildUserViewResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
  async getAllByUser(userId: number, page?: number, limit?: number) {
    const resp = await UserViewsRepo.getAllByUser(userId, page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = buildUserViewResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
  async getAll(page?: number, limit?: number) {
    const resp = await UserViewsRepo.getAll(page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = buildUserViewResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
};

export default UserViewServices;

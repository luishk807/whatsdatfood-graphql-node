import { UserSearchesInput } from 'db/models/userSearches';
import UserSearch from 'repository/userSearches.repository';
import {
  buildUserSearchEntry,
  buildUserSearchResponse,
} from 'helpers/users.sequelize';
import { _get } from 'helpers';

import { LIMIT } from 'constants/sequelize';
const UserSearchesRepo = new UserSearch();

const UserSearchServices = {
  async create(payload: UserSearchesInput) {
    const new_payload = await buildUserSearchEntry(payload);
    const isExists = await this.checkIfExists(
      new_payload.user_id,
      new_payload.name,
      true,
    );

    if (isExists) {
      return null;
    }

    return await UserSearchesRepo.create<UserSearchesInput>(new_payload);
  },
  async checkIfExists(userId: number, name: string, isToday?: boolean) {
    return await UserSearchesRepo.checkIfExists(userId, name, isToday);
  },
  async getAllByUser(userId: number, page?: number, limit?: number) {
    const resp = await UserSearchesRepo.getAllByUser(userId, page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = buildUserSearchResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
  async getAll(page?: number, limit?: number) {
    const resp = await UserSearchesRepo.getAll(page, limit);

    const totalPages = Math.ceil(resp.count / LIMIT);
    const data = resp.rows;
    const totalItems = resp.count;

    const formatData = buildUserSearchResponse(data);
    return {
      data: formatData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },
};

export default UserSearchServices;

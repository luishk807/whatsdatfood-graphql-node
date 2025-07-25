import { UserRatingsInput } from 'db/models/userRatings';
import { buildUserRatingResponse } from 'helpers/users.sequelize';
import UserRating from 'repository/userRating.repository';
const UserRatingRepo = new UserRating();

const UserServices = {
  async create(payload: UserRatingsInput) {
    return await UserRatingRepo.create<UserRatingsInput>(payload);
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
  async getAll() {
    const resp = await UserRatingRepo.getAll();
    return buildUserRatingResponse(resp);
  },
};

export default UserServices;

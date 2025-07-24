import { UserRatingsInput } from 'db/models/userRatings';
import UserRating from 'repository/userRating.repository';
const UserRatingRepo = new UserRating();

const UserServices = {
  async create(payload: UserRatingsInput) {
    return await UserRatingRepo.create(payload);
  },
  async update(payload: UserRatingsInput) {
    return await UserRatingRepo.update(payload);
  },
  async deleteById(id: number) {
    return await UserRatingRepo.deleteById(id);
  },
  async findById(id: number) {
    return await UserRatingRepo.getOneById(id);
  },
  async getAll() {
    return await UserRatingRepo.getAll();
  },
};

export default UserServices;

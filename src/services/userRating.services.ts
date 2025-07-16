import { UserRatingsInput } from 'db/models/userRatings';
import UserRating from 'repository/userRating.repository';
import { buildUserRatingPayload } from 'helpers/users.sequelize';
const UserRatingRepo = new UserRating();

const UserServices = {
  async create(payload: UserRatingsInput) {
    const new_payload = await buildUserRatingPayload(payload);
    return await UserRatingRepo.create(new_payload);
  },
  async update(payload: UserRatingsInput) {
    const new_payload = await buildUserRatingPayload(payload);
    return await UserRatingRepo.update(new_payload);
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

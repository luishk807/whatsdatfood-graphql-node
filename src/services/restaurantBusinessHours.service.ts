import { RestaurantBusinessHoursInput } from 'db/models/restaurantBusinessHours';
import { getRestaurantBusinessHoursResponse } from 'helpers/restaurants.sequelize';
import RestaurantBusinessHours from 'repository/restaurantBusinessHours.respository';
const RestaurantBusinessHoursRepo = new RestaurantBusinessHours();

const UserServices = {
  async create(payload: RestaurantBusinessHoursInput) {
    return await RestaurantBusinessHoursRepo.create(payload);
  },
  async bulkCreate(payload: RestaurantBusinessHoursInput[]) {
    return await RestaurantBusinessHoursRepo.bulkCreate(payload);
  },
  async update(payload: RestaurantBusinessHoursInput) {
    return await RestaurantBusinessHoursRepo.update(payload);
  },
  async deleteById(id: number) {
    return await RestaurantBusinessHoursRepo.deleteFromRestaurantId(id);
  },
  async findById(id: number) {
    return await RestaurantBusinessHoursRepo.getOneById(id);
  },
  async getAll() {
    const resp = await RestaurantBusinessHoursRepo.getAll();
    return getRestaurantBusinessHoursResponse(resp);
  },
};

export default UserServices;

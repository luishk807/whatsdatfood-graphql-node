import { RestaurantBusinessHoursInput } from 'db/models/restaurantBusinessHours';
import {
  getRestaurantBusinessHoursResponse,
  buildRestaurantBusinessHoursPayload,
} from 'helpers/restaurants.sequelize';
import RestaurantBusinessHours from 'repository/restaurantBusinessHours.respository';
import { BusinessHours } from 'interfaces';
const RestaurantBusinessHoursRepo = new RestaurantBusinessHours();

const UserServices = {
  async create(payload: RestaurantBusinessHoursInput) {
    return await RestaurantBusinessHoursRepo.create<RestaurantBusinessHoursInput>(
      payload,
    );
  },
  async bulkCreate(payload: RestaurantBusinessHoursInput[]) {
    return await RestaurantBusinessHoursRepo.bulkCreate<RestaurantBusinessHoursInput>(
      payload,
    );
  },
  async update(payload: RestaurantBusinessHoursInput) {
    return await RestaurantBusinessHoursRepo.update<RestaurantBusinessHoursInput>(
      payload,
    );
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
  async processBusinesHoursFromRestaurant(
    restId: number,
    business_hours: BusinessHours,
  ) {
    //create businesss hours
    const businessHoursPayload = buildRestaurantBusinessHoursPayload(
      restId,
      business_hours,
    );

    if (businessHoursPayload) {
      // delete previous business hours if exists
      await this.deleteById(restId);

      console.log('adding the businesss hours', businessHoursPayload);
      await this.bulkCreate(businessHoursPayload);
    }
  },
};

export default UserServices;

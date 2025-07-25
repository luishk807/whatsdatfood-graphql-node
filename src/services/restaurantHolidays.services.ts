import { RestaurantHolidaysInput } from 'db/models/restaurantHolidays';
import RestaurantHoliday from 'repository/restaurantHolidays.respository';
import { _get } from 'helpers';
import {
  buildRestaurantHolidayPayload,
  getRestaurantHolidayResponse,
} from 'helpers/restaurants.sequelize';
import HolidayService from './holidays.service';
const RestaurantHolidayRepo = new RestaurantHoliday();

const RestaurantHolidayService = {
  async create(item: RestaurantHolidaysInput) {
    return await RestaurantHolidayRepo.create<RestaurantHolidaysInput>(item);
  },
  async bulkCreate(holiday: RestaurantHolidaysInput[]) {
    return await RestaurantHolidayRepo.bulkCreate<RestaurantHolidaysInput>(
      holiday,
    );
  },
  async deleteByRestaurantId(id: number) {
    return await RestaurantHolidayRepo.deleteByRestaurantId(id);
  },
  async findById(id: number) {
    const resp = await RestaurantHolidayRepo.getOneById(id);
    return getRestaurantHolidayResponse(resp);
  },
  async getAll() {
    const resp = await RestaurantHolidayRepo.getAll();
    return getRestaurantHolidayResponse(resp);
  },
  async processRestaurantHolidayFromRestaurant(
    restId: number,
    holidays: string[],
  ) {
    if (Array.isArray(holidays)) {
      const holidaySaved = [];
      for (let holiday of holidays) {
        const resp = await HolidayService.findOrCreate(
          holiday.trim().toLowerCase(),
        );
        if (resp) {
          let item = buildRestaurantHolidayPayload(restId, resp);
          holidaySaved.push(item as RestaurantHolidaysInput);
        }
      }

      if (holidaySaved.length) {
        await this.deleteByRestaurantId(restId);
        await this.bulkCreate(holidaySaved);
      }
    }
  },
};

export default RestaurantHolidayService;

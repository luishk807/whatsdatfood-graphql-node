import { HolidaysInput } from 'db/models/holidays';
import HolidayRepository from 'repository/holiday.repository';
import {
  buildHolidayPayload,
  buildHolidayResponse,
} from 'helpers/holidays.sequelize';
import { Holiday } from 'interfaces/holidays';
import { _get } from 'helpers';
import { buildRestaurantHolidayPayload } from 'helpers/restaurants.sequelize';
const HolidayRepo = new HolidayRepository();

const UserServices = {
  async create(holiday: string) {
    const entry = buildHolidayPayload(holiday);
    if (entry) {
      return await HolidayRepo.create<HolidaysInput>(entry);
    }
    return false;
  },
  async findOrCreate(holiday: string) {
    const entry = buildHolidayPayload(holiday);
    if (entry) {
      return await HolidayRepo.findOrCreate<HolidaysInput>('name', entry);
    }
    return false;
  },
  async bulkCreate(holiday: HolidaysInput[]) {
    return await HolidayRepo.bulkCreate<HolidaysInput>(holiday);
  },
  async deleteByRestaurantId(id: number) {
    return await HolidayRepo.deleteByRestaurantId(id);
  },
  async findById(id: number) {
    const resp = await HolidayRepo.getOneById(id);
    return buildHolidayResponse(resp as Holiday);
  },
  async getAll() {
    const resp = await HolidayRepo.getAll();
    return buildHolidayResponse(resp as Holiday);
  },
//   async proccessHolidayFromRestaurant(restId: number, holidays: string[]) {
//     if (Array.isArray(holidays)) {
//       const holidaySaved = [];
//       for (let holiday in holidays) {
//         const resp = await this.findOrCreate(holiday);
//         if (resp) {
//           let item = buildRestaurantHolidayPayload(restId, resp);
//           holidaySaved.push(item);
//         }
//       }

//       if (holidaySaved.length) {
//         await this.deleteByRestaurantId(restId);
//         await this.bulkCreate(holidaySaved);
//       }
//     }
//   },
};

export default UserServices;

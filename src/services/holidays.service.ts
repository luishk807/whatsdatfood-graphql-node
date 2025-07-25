import { HolidaysInput } from 'db/models/holidays';
import HolidayRepository from 'repository/holiday.repository';
import {
  buildHolidayPayload,
  buildHolidayResponse,
} from 'helpers/holidays.sequelize';
import { Holiday } from 'interfaces/holidays';
import { _get } from 'helpers';
const HolidayRepo = new HolidayRepository();

const HolidayService = {
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
      return await HolidayRepo.findOrCreate<HolidaysInput>('name', entry, true);
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
};

export default HolidayService;

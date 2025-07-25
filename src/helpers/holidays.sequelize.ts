import { dbAliases } from 'db';
import { _get } from 'helpers';
import { Holiday } from 'interfaces/holidays';
import { DEFAULT_STATUS } from 'constants/sequelize';
export const buildHolidayPayload = (item: string) => {
  if (!item) {
    return null;
  }

  return {
    name: item.trim().toLowerCase(),
    status_id: DEFAULT_STATUS,
  };
};

export const buildHolidayResponse = (item: Holiday | Holiday[]) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return null;
  }

  if (Array.isArray(item)) {
    return item.map((holiday) => ({
      ...holiday,
      status: _get(holiday, dbAliases.holidays.status),
    }));
  }

  return {
    ...item,
    status: _get(item, dbAliases.holidays.status),
  };
};

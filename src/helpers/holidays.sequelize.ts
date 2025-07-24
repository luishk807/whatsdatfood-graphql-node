import { _get } from 'helpers';
export const buildHolidayPayload = (item: any) => {
  return {
    name: _get(item, 'name'),
  };
};

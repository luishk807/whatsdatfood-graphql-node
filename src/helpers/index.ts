import slugify from 'slugify';
import _ from 'lodash';
import { GetBuiltAddress } from 'types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const getSlug = (value: string) => {
  let textData: string | undefined;
  if (!value) {
    return textData;
  }
  const slug = slugify(value, { lower: true, strict: true });
  return getStrToText(slug);
};

export const convertStringToNumber = (str: string) => {
  let price = 0;

  if (str) {
    if (typeof str === 'number') {
      price = str;
    } else if (typeof str === 'string') {
      const cleaned = str.replace(/[^0-9.]/g, '');
      price = cleaned && !isNaN(Number(cleaned)) ? parseFloat(cleaned) : 0;
    }
  }
  return price;
};

export const getDataIfArray = <T>(data: T) =>
  Array.isArray(data) ? data[0] : data;

export const getBuiltAddress: GetBuiltAddress = (address) => {
  let new_address = '';
  const { address: c_address, city, country, state, postal_code } = address;
  if (address) {
    new_address += `${c_address} `;
  }
  if (city) {
    new_address += `${city} `;
  }
  if (state) {
    new_address += `${state} `;
  }
  if (postal_code) {
    new_address += `${postal_code} `;
  }
  if (country) {
    new_address += `${country} `;
  }
  return new_address.trim();
};

export const todayDates = () => {
  const startOftoday = dayjs().startOf('day').toDate();
  const endOftoday = dayjs().endOf('day').toDate();

  return {
    startOftoday,
    endOftoday,
  };
};

export const isValidDate = (date: string) => {
  return dayjs(date).isValid();
};

export const getTimeSplit = (times: string) => {
  const times_split = times.split('-');

  if (Array.isArray(times_split) && times_split.length > 1) {
    const format = 'HH:mm';
    const time1 = dayjs(times_split[0], format, true).isValid();
    const time2 = dayjs(times_split[1], format, true).isValid();

    if (time1 && time2) {
      return {
        open_time: times_split[0],
        close_time: times_split[1],
      };
    }
  }
  return null;
};

export const _get = <T, R = undefined>(
  obj: T,
  path: string,
  defaultValue?: R,
): any => _.get(obj, path, defaultValue);

export const getStrToText = (value: string | undefined): string | undefined =>
  value;

import slugify from 'slugify';
import _ from 'lodash';
import { getBuiltAddressType } from 'types';

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
export const getBuiltAddress: getBuiltAddressType = (address) => {
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

// export const _get = <T, R = unknown>(
//   obj: T,
//   path: string,
//   defaultValue?: R,
// ): R | undefined => {
//   return _.get(obj, path, defaultValue) as R | undefined;
// };

export const _get = <T, R = undefined>(
  obj: T,
  path: string,
  defaultValue?: R,
): any => _.get(obj, path, defaultValue);

export const getStrToText = (value: string | undefined): string | undefined =>
  value;

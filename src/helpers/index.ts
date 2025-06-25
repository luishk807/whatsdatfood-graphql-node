import slugify from 'slugify';
import _ from 'lodash';
import { getBuiltAddressType } from 'types';
import bycript from 'bcrypt';
export const getSlug = (value: string) => {
  let textData: Text | undefined;
  if (!value) {
    return textData;
  }
  const slug = slugify(value, { lower: true, strict: true });
  return getStrToText(slug);
};

export const createHashPassword = async (password: any) => {
  try {
    const saltRounds = 10;
    const salt = await bycript.genSalt(saltRounds);
    const hashedPassword = await bycript.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
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

export const _get = (obj: any, target: any): any => _.get(obj, target);

export const getStrToText = (value: string): Text | undefined =>
  value as unknown as Text;

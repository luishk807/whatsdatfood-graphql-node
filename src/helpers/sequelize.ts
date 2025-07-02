import { _get } from '.';

export const getPageOffset = (limit: number, pageNumber: number) => {
  return limit * (pageNumber - 1);
};

export const normalizeApostrophes = (str: string) => {
  return str
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');
};

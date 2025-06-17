export const getPageOffset = (limit: number, pageNumber: number) => {
  return limit * (pageNumber - 1);
};

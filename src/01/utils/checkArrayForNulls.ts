export const isNullInArray = (array: Array<string | number>): boolean => {
  const nullIndex = array.findIndex((elem) => +elem === 0);
  return nullIndex !== -1;
};

export const getFilledArray = <T>(
  length: number,
  callback: (index: number) => T
): T[] => Array.from(Array(length).keys()).map(callback);

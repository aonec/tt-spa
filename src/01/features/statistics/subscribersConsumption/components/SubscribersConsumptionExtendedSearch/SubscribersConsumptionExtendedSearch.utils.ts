export const prepareConsumptionForInput = (consumption: number | undefined) => {
  if (consumption === undefined) {
    return null;
  }
  return consumption;
};

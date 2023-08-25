import { round } from 'lodash';

export const prepareConsumptions = (consumption: number | null) => {
  if (consumption === null) {
    return '-';
  }
  return round(consumption, 3);
};

import { round } from 'lodash';

export const prepareConsumptions = (consumption: number | null) => {
  if (!consumption) {
    return '-';
  }
  return round(consumption, 3);
};

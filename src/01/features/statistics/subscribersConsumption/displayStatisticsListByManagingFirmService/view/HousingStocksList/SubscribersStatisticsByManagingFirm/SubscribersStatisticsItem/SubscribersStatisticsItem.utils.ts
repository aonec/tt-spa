import { round } from 'lodash';

export const prepareSupplyConsumption = (consumption: number | null) => {
  if (!consumption) {
    return '-';
  }
  return round(consumption, 3);
};

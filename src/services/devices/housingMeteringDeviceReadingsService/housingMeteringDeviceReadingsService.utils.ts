import _ from 'lodash';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export const groupReadings = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  return _.groupBy(readings, 'year');
};

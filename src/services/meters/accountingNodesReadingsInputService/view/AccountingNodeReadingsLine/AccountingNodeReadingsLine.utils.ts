import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/types';

export const getNodeReadingValue = (
  reading?: HousingMeteringDeviceReadingsIncludingPlacementResponse,
) => {
  if (!reading) {
    return null;
  }
  return reading.value;
};

import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export const getNodeReadingValue = (
  reading?: HousingMeteringDeviceReadingsIncludingPlacementResponse,
) => {
  if (!reading) {
    return null;
  }
  return reading.value;
};

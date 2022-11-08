import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export type MeteringDeviceMonthReadingProps = {
  reading: HousingMeteringDeviceReadingsIncludingPlacementResponse;
  isColdWater: boolean;
};

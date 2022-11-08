import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export type MeteringDeviceMonthReadingProps = {
  monthReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  isColdWater: boolean;
  month: string;
};

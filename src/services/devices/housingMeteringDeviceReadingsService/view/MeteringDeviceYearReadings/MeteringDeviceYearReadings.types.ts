import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export type MeteringDeviceYearReadingsProps = {
  year: string;
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  isColdWater: boolean;
};

import { Dictionary } from 'lodash';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export type MeteringDeviceYearReadingsProps = {
  year: string;
  readings: Dictionary<
    HousingMeteringDeviceReadingsIncludingPlacementResponse[]
  >;
  isColdWater: boolean;
};

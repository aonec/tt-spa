import { Dictionary } from 'lodash';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export type MeteringDeviceYearReadingsProps = {
  year: string;
  yearRreadings: {
    month: string;
    readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  }[];
  isColdWater: boolean;
};

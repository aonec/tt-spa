import { Dictionary } from 'lodash';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export type MeteringDeviceReadingsTableProps = {
  isColdWater: boolean;
  readings: Dictionary<
    HousingMeteringDeviceReadingsIncludingPlacementResponse[]
  >;
};

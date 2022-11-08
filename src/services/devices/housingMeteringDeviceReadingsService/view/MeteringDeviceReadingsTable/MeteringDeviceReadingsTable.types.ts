import { Dictionary } from 'lodash';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { PreparedMeteringDeviceReadings } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceReadingsTableProps = {
  isColdWater: boolean;
  readings: PreparedMeteringDeviceReadings;
};

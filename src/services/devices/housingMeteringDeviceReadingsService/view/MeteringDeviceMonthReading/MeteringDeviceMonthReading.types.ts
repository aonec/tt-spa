import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import {
  SortedMeteringDeviceReading,
} from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceMonthReadingProps = {
  monthReadings: SortedMeteringDeviceReading[];
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];

  isColdWater: boolean;
  month: string;
  createReading: (reading: { value: number; deviceId: number }) => void;
};

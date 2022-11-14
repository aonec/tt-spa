import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import {
  PreparedMeteringDeviceReading,
  SortedMeteringDeviceReading,
} from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceMonthReadingProps = {
  monthReadings: (SortedMeteringDeviceReading | null)[];
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];

  isColdWater: boolean;
  month: string;
  createReading: (reading: { value: number; deviceId: number }) => void;
};

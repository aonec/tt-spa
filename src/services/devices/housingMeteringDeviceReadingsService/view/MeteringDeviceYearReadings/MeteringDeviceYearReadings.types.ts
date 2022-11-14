import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { SortedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceYearReadingsProps = {
  year: string;
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  yearRreadings: {
    month: string;
    readings: SortedMeteringDeviceReading[];
  }[];
  isColdWater: boolean;
  createReading: (reading: {
    value: number;
    deviceId: number;
    month: string;
  }) => void;
};

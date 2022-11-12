import { SortedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceYearReadingsProps = {
  year: string;
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

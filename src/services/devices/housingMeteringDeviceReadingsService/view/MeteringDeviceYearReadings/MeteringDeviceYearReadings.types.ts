import { SortedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceYearReadingsProps = {
  year: string;
  yearRreadings: {
    month: string;
    readings: (SortedMeteringDeviceReading | null)[];
  }[];
  isColdWater: boolean;
};

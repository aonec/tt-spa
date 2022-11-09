import { SortedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceMonthReadingProps = {
  monthReadings: (SortedMeteringDeviceReading | null)[];
  isColdWater: boolean;
  month: string;
};

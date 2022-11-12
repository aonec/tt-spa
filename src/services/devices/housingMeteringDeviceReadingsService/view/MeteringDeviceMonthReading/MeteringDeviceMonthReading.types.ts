import { SortedMeteringDeviceReading } from '../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceMonthReadingProps = {
  monthReadings: (SortedMeteringDeviceReading | null)[];
  isColdWater: boolean;
  month: string;
  createReading: (reading: { value: number; deviceId: number }) => void;
};

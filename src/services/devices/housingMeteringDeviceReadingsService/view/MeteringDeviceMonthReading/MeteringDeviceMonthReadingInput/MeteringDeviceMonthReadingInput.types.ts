import { SortedMeteringDeviceReading } from 'services/devices/housingMeteringDeviceReadingsService/housingMeteringDeviceReadingsService.types';

export type MeteringDeviceMonthReadingInputProps = {
  setFieldValue: (reading: SortedMeteringDeviceReading) => void;
  reading: SortedMeteringDeviceReading;
  createReading: (reading: { value: number; deviceId: number }) => void;
};

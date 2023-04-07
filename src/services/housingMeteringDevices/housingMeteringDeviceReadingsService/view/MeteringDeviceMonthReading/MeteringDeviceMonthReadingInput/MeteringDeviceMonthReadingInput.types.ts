import { SortedMeteringDeviceReading } from 'services/housingMeteringDevices/housingMeteringDeviceReadingsService/housingMeteringDeviceReadingsService.types';

export type MeteringDeviceMonthReadingInputProps = {
  setFieldValue: (reading: SortedMeteringDeviceReading) => void;
  reading: SortedMeteringDeviceReading;
  createReading: (reading: { value: number; deviceId: number }) => void;
};

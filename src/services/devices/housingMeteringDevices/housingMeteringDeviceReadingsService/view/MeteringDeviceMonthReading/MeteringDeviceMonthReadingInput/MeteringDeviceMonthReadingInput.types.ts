import { SortedMeteringDeviceReading } from '../../../housingMeteringDeviceReadingsService.types';

export type MeteringDeviceMonthReadingInputProps = {
  setFieldValue: (reading: SortedMeteringDeviceReading) => void;
  reading: SortedMeteringDeviceReading;
  createReading: (reading: { value: number; deviceId: number }) => void;
  initialFeedFlowReading?: SortedMeteringDeviceReading | null;
  initialFeedBackFlowReading?: SortedMeteringDeviceReading | null;
};

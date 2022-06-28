import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

export type MeteringDeviceReadings = {
  id: number;
  currentReading: MeteringDeviceReading | undefined;
  previousExistingReading: MeteringDeviceReading;
};

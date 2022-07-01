import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

// export type MeteringDeviceReadings = {
//   id: number;
//   currentReading: MeteringDeviceReading | undefined;
//   previousExistingReading: MeteringDeviceReading;
// };

export type MeteringDeviceReadings = {
  [key: number]: {
    currentReading: MeteringDeviceReading | undefined;
    previousExistingReading: MeteringDeviceReading;
  };
};

export type UpdateNodeReadingsPayload = {
  id: number;
  value: {
    currentReading: MeteringDeviceReading | undefined;
    previousExistingReading: MeteringDeviceReading;
  };
};

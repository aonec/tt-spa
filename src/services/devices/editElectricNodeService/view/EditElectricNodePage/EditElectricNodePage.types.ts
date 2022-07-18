import { ElectricHousingMeteringDeviceResponse, EYearQuarter } from 'myApi';

export type EditElectricNodePageProps = {
  device: ElectricHousingMeteringDeviceResponse;
  handleUpdateDevice: (payload: UpdateElectricHousingMeteringDevice) => void;
};

export type UpdateElectricHousingMeteringDevice = {
  model: string;
  openingDate: string;
  stateVerificationYear: number;
  nextStateVerificationYear: number;
  stateVerificationQuarter: EYearQuarter;
  stateVerificationIntervalYears: number;
  deviceId: number;
};

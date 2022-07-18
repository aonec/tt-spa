import { ElectricHousingMeteringDeviceResponse, EYearQuarter } from 'myApi';
import { EditElectricNodePageGrouptype } from '../../editElectricNodeService.types';

export type EditElectricNodePageProps = {
  device: ElectricHousingMeteringDeviceResponse | null;
  handleUpdateDevice: (payload: UpdateElectricHousingMeteringDevice) => void;
  isLoadingUpdate: boolean;
  isLoadingDevice: boolean;
  grouptype: EditElectricNodePageGrouptype;
};

export type UpdateElectricHousingMeteringDevice = {
  Model: string;
  InstallationDate: string;
  StateVerificationYear: string;
  NextStateVerificationYear: string;
  StateVerificationQuarter: EYearQuarter;
  StateVerificationIntervalYears: number;
  deviceId: number;
};

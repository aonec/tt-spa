import { ElectricHousingMeteringDeviceResponse, EYearQuarter } from "../../../../../api/types";

export type EditElectricNodePageProps = {
  device: ElectricHousingMeteringDeviceResponse | null;
  handleUpdateDevice: (payload: UpdateElectricHousingMeteringDevice) => void;
  isLoadingUpdate: boolean;
  isLoadingDevice: boolean;
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

export enum EditElectricNodeGrouptype {
  edit = 'edit',
  documents = 'documents',
}

import { ElectricHousingMeteringDeviceResponse, EYearQuarter } from 'myApi';
import { EditElectricNodePayload } from '../../editElectricNodeService.types';

export type EditElectricNodePageProps = {
  device: ElectricHousingMeteringDeviceResponse | null;
  handleUpdateDevice: (payload: EditElectricNodePayload) => void;
  isLoadingUpdate: boolean;
  isLoadingDevice: boolean;
};

export type UpdateElectricHousingMeteringDevice = {
  model: string;
  installationDate: string;
  stateVerificationYear: string;
  nextStateVerificationYear: string;
  stateVerificationQuarter: EYearQuarter;
  stateVerificationIntervalYears: number;
};

export enum EditElectricNodeGrouptype {
  edit = 'edit',
  documents = 'documents',
}

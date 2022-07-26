import {
  EClosingReason,
  ElectricHousingMeteringDeviceResponse,
  EYearQuarter,
  SwitchElectricHousingDeviceRequest,
  SwitchHousingDeviceReadingsCreateRequest,
} from '../../api/types';

export type ChangeODPUFormProps = {
  oldDevice: ElectricHousingMeteringDeviceResponse;
  handleSwitchDevice: (payload: SwitchElectricHousingDeviceRequest) => void;
  isLoading: boolean;
};

export type SwitchElectricHousingDeviceRequestFormPayload = {
  model: string;
  serialNumber: string;
  bitDepth: string;
  scaleFactor: string;
  openingDate: string | null;
  manufactureYear: string | null;
  stateVerificationQuarter?: EYearQuarter | null;
  stateVerificationYear?: string | null;
  nextStateVerificationYear?: string | null;
  stateVerificationIntervalYears: string;
  oldDeviceClosingReason?: EClosingReason | null;
  sealNumber?: string;
  sealInstallationDate?: string | null;
  lastCheckingDate?: string | null;
  futureCheckingDate?: string | null;
  contractorId?: number | null;
  oldDeviceReadings?: SwitchHousingDeviceReadingsCreateRequest[];
  newDeviceReadings: SwitchHousingDeviceReadingsCreateRequest[];
};

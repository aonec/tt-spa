import {
  ElectricHousingMeteringDeviceResponse,
  SwitchElectricHousingDeviceRequest,
} from 'myApi';

export type ChangeODPUPageProps = {
  oldDevice: ElectricHousingMeteringDeviceResponse | null;
  isLoadingDevice: boolean;
  isLoadingSwitch: boolean;
  handleSwitchDevice: (payload: SwitchElectricHousingDeviceRequest) => void;
};

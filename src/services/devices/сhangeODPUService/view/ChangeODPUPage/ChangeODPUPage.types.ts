import { ElectricHousingMeteringDeviceResponse, SwitchElectricHousingDeviceRequest } from "../../../../../api/types";


export type ChangeODPUPageProps = {
  oldDevice: ElectricHousingMeteringDeviceResponse | null;
  isLoadingDevice: boolean;
  isLoadingSwitch: boolean;
  handleSwitchDevice: (payload: SwitchElectricHousingDeviceRequest) => void;
};

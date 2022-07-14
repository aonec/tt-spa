import { ElectricHousingMeteringDeviceResponse } from 'myApi';

export type ChangeODPUPageProps = {
  oldDevice: ElectricHousingMeteringDeviceResponse | null;
  isLoading: boolean;
};

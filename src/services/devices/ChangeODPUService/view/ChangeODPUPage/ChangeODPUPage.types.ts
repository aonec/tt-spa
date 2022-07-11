import { ElectricHousingMeteringDeviceResponse, SwitchHousingDeviceReadingsCreateRequest } from 'myApi';
export type ChangeODPUPageProps = {
  oldDevice: ElectricHousingMeteringDeviceResponse | null;
  addNewReading: (payload: SwitchHousingDeviceReadingsCreateRequest) => void;
};

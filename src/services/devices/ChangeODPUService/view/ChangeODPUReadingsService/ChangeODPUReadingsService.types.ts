import { ElectricHousingMeteringDeviceResponse, SwitchHousingDeviceReadingsCreateRequest } from 'myApi';

export type ChangeODPUReadingsProps = {
  device: ElectricHousingMeteringDeviceResponse | null;
  addNewReading: (payload: SwitchHousingDeviceReadingsCreateRequest) => void;
};

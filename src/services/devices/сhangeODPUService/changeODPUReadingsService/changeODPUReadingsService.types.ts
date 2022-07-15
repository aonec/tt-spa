import {
  ElectricHousingMeteringDeviceResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  SwitchHousingDeviceReadingsCreateRequest,
} from 'myApi';

export type ChangeODPUReadingsProps = {
  device: ElectricHousingMeteringDeviceResponse | null;
  onChangeNewReadings: (
    payload: SwitchHousingDeviceReadingsCreateRequest[]
  ) => void;
  onChangeOldReadings: (
    payload: SwitchHousingDeviceReadingsCreateRequest[]
  ) => void;
};

export type PreparedHousingMeteringDeviceReadings = Pick<
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  'readingDate' | 'id'
> & { text: string; value: string | null, nonResidentialRoomConsumption: string| null };

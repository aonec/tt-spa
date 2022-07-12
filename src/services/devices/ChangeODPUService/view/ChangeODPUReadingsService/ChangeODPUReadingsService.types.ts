import {
  ElectricHousingMeteringDeviceResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';

export type ChangeODPUReadingsProps = {
  device: ElectricHousingMeteringDeviceResponse | null;
};

export type PreparedHousingMeteringDeviceReadings = Pick<
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  'readingDate' | 'id'
> & { text: string; value: number | null };

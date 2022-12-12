import {
  CreateHousingMeteringDeviceReadingsRequest,
  EMagistralType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';

export type MeteringDeviceReadingsTableProps = {
  isColdWater: boolean;
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  createReading: (reading: CreateHousingMeteringDeviceReadingsRequest) => void;
  deviceIds: { [key in EMagistralType]: number | null };
};

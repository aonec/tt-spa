import {
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';

export type MeteringDeviceReadingsTableProps = {
  isColdWater: boolean;
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  createReading: (reading: CreateHousingMeteringDeviceReadingsRequest) => void;
};

import { Event } from 'effector';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  EMagistralType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';

export type MeteringDeviceReadingsTableProps = {
  isColdWater: boolean;
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  createReading: (reading: CreateHousingMeteringDeviceReadingsRequest) => void;
  deviceIds: { [key in EMagistralType]: number | null };
  failureCreateReading: Event<EffectFailDataAxiosError>;
};

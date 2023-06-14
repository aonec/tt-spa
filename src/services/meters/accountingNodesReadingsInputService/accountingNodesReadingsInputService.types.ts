import {
  CreateHousingMeteringDeviceReadingsRequest,
  ElectricHousingMeteringDeviceResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { MetersInputBlockStatus } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';

export type AccountingNodesReadingsInputContainerProps = {
  sliderIndex: number;
  device: ElectricHousingMeteringDeviceResponse;
  deviceIndex: number;
};

export type UpdateHousingMeteringDeviceReadingsPayload = {
  id: string;
  nonResidentialRoomConsumption: number;
};

export type CreateHousingMeteringDeviceReadingsPayload =
  CreateHousingMeteringDeviceReadingsRequest & { deviceId: number };

export type NodeReadingsStatusesByDevices = {
  [deviceId: number]: NodeReadingsStatuses;
};

export type NodeReadingsStatuses = {
  [key: number | string]: MetersInputBlockStatus | null;
};

export type PreparedNodeReadingsDataByDevices = {
  [deviceId: number]: PreparedNodeReadingsData;
};

export type PreparedNodeReadingsData = {
  [key: number]: HousingMeteringDeviceReadingsIncludingPlacementResponse;
};

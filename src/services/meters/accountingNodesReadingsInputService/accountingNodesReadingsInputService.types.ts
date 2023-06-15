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
  oldReadingId: string;
  deviceId: number;
  nonResidentialRoomConsumption: number;
};

export type DeleteNodeReading = {
  id: string;
  deviceId: number;
};

export type CreateHousingMeteringDeviceReadingsPayload =
  CreateHousingMeteringDeviceReadingsRequest & {
    deviceId: number;
    oldReadingId?: string;
  };

export type NodeReadingsStatusesByDevices = {
  [deviceId: number]: NodeReadingsStatuses;
};

export type NodeReadingsStatuses = {
  [key: number | string]: MetersInputBlockStatus | null;
};

export type NodeReadingsDataByDevices = {
  [deviceId: number]: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
};

export type PreparedNodeReadingsData = {
  [key: number]: HousingMeteringDeviceReadingsIncludingPlacementResponse;
};

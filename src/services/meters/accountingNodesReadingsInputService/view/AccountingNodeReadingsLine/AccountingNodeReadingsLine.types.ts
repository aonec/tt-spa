import {
  ElectricHousingMeteringDeviceResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'api/types';
import {
  NodeReadingsStatuses,
  UpdateHousingMeteringDeviceReadingsPayload,
} from '../../accountingNodesReadingsInputService.types';
import { UpdateAccountingNodesSumPayload } from 'services/meters/metersService/AccountingNodesReadingsService/AccountingNodesReadingsService.types';

export type AccountingNodeReadingsLineProps = {
  device: ElectricHousingMeteringDeviceResponse;
  sliderIndex: number;
  deviceIndex: number;
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[];
  deviceInputStatuses: NodeReadingsStatuses;
  deviceNonResConsumptionInputStatuses: NodeReadingsStatuses;
  handleSendNonResConsumption: (
    payload: Omit<UpdateHousingMeteringDeviceReadingsPayload, 'deviceId'>,
  ) => void;
  handleValidateReading: (payload: PreValidatedNodeReadings) => void;
  handleUpdateReadingsSum: (
    payload: Omit<UpdateAccountingNodesSumPayload, 'id'>,
  ) => void;
  handleOpenHistory: (payload: number) => void;
};

export type PreValidatedNodeReadings = {
  value: number | null;
  readingDate: string;
  reading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
};

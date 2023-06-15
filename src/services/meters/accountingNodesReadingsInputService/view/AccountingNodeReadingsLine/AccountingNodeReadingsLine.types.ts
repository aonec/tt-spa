import {
  ElectricHousingMeteringDeviceResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
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
    payload: UpdateHousingMeteringDeviceReadingsPayload,
  ) => void;
  handleValidateReading: (payload: PreValidatedNodeReadings) => void;
  handleUpdateReadingsSum: (
    payload: Omit<UpdateAccountingNodesSumPayload, 'id'>,
  ) => void;
};

export type PreValidatedNodeReadings = {
  value: number | null;
  readingDate: string;
  reading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
};

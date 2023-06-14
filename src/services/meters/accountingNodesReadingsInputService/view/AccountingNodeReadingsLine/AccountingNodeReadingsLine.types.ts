import {
  CreateHousingMeteringDeviceReadingsRequest,
  ElectricHousingMeteringDeviceResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import {
  NodeReadingsStatuses,
  UpdateHousingMeteringDeviceReadingsPayload,
} from '../../accountingNodesReadingsInputService.types';

export type AccountingNodeReadingsLineProps = {
  device: ElectricHousingMeteringDeviceResponse;
  sliderIndex: number;
  deviceIndex: number;
  previousReading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
  previousExistingReadingBySliderIndex?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
  currentReading?: HousingMeteringDeviceReadingsIncludingPlacementResponse;
  deviceInputStatuses: NodeReadingsStatuses;
  deviceNonResConsumptionInputStatuses: NodeReadingsStatuses;
  sendNonResConsumption: (
    payload: UpdateHousingMeteringDeviceReadingsPayload,
  ) => void;
  handleSendReading: (
    payload: Omit<CreateHousingMeteringDeviceReadingsRequest, 'deviceId'>,
  ) => void;
};

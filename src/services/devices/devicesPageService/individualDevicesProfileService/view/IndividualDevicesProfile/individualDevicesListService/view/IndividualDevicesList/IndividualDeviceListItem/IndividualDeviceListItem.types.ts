import {
  IndividualDeviceConsumptionResponse,
  IndividualDeviceResponseFromDevicePage,
} from 'api/myApi';

export type IndividualDeviceListItemProps = {
  device: IndividualDeviceResponseFromDevicePage;
  apartmentId?: number;
  housingStockId?: number;
  consumptionData: IndividualDeviceConsumptionResponse[];
  isConsumptionsLoading: boolean;
};

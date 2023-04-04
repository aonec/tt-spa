import {
  IndividualDeviceConsumptionResponse,
  IndividualDeviceResponseFromDevicePage,
} from 'myApi';

export type IndividualDeviceListItemProps = {
  device: IndividualDeviceResponseFromDevicePage;
  apartmentId?: number;
  housingStockId?: number;
  consumptionData: IndividualDeviceConsumptionResponse[];
  isConsumptionsLoading: boolean;
};

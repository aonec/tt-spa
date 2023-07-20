import {
  IndividualDeviceConsumptionResponse,
  IndividualDeviceResponseFromDevicePage,
} from 'api/types';

export type IndividualDeviceListItemProps = {
  device: IndividualDeviceResponseFromDevicePage;
  apartmentId?: number;
  housingStockId?: number;
  consumptionData: IndividualDeviceConsumptionResponse[];
  isConsumptionsLoading: boolean;
};

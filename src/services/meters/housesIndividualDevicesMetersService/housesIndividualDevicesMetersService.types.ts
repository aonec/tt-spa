import { IndividualDeviceListItemResponse } from 'api/myApi';
import { ConsumptionRatesDictionary } from '../managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';

export type HousesIndividualDevicesMetersContainerProps = {
  individualDevicesList: IndividualDeviceListItemResponse[];
  openReadingsHistoryModal: (deviceId: number) => void;
  managementFirmConsumptionRates: ConsumptionRatesDictionary | null;
};

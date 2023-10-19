import {
  HousingStockResponse,
  IndividualDeviceListItemResponse,
  InspectorResponse,
} from 'api/types';
import { ConsumptionRatesDictionary } from 'services/meters/managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';
import { GetHousingStocksListRequestPayload } from '../../HousesReadingsService.types';

export type HousesReadingsPageProps = {
  housingStock: HousingStockResponse | null;
  handleSearchHousingStock: (
    payload: GetHousingStocksListRequestPayload,
  ) => void;
  isLoadingHousingStock: boolean;
  inspector: InspectorResponse | null;
  individualDevicesList: IndividualDeviceListItemResponse[];
  loadNextPageOfIndividualDevicesList: () => void;
  isLoadingIndividualDevices: boolean;
  managementFirmConsumptionRates: ConsumptionRatesDictionary | null;
  openReadingsHistoryModal: (deviceId: number) => void;
  isAllDevicesLoaded: boolean;
  isHousingStockFetched: boolean;
  totalItems: number;
};

import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { HousingByFilterResponse } from 'myApi';
import { DevicesSearchType } from 'services/housingMeteringDevices/devicesPageService/devicesPageService.types';
import { DevicesByAddressInterface } from '../../displayDevicesService.types';

export type DevicesListProps = {
  housingStocksDevices: DevicesByAddressInterface[];
  housingStocksAddressForSwitcher: HousingByFilterResponse[];
  isLoading: boolean;
  total?: number;
  pageNumber?: number;
  pageSize?: number;
  setPageNumber: (pageNumber: number) => void;
  setAddressBySwither: (address: CalculatorsListRequestPayload) => void;
  mainFilterSearchType: DevicesSearchType;
  setMainFilterSearchType: (type: DevicesSearchType) => void;
};

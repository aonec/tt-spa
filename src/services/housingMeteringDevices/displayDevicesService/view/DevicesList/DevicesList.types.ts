import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { DevicesByAddressInterface } from '01/_pages/Devices/components/utils/groupDevicesByObjects';
import { HousingByFilterResponse } from 'myApi';
import { DevicesSearchType } from 'services/housingMeteringDevices/devicesPageService/devicesPageService.types';

export type DevicesListProps = {
  devices: DevicesByAddressInterface[];
  housingsByFilter: HousingByFilterResponse[];
  isLoading: boolean;
  total?: number;
  pageNumber?: number;
  pageSize?: number;
  setPageNumber: (pageNumber: number) => void;
  setAddress: (address: CalculatorsListRequestPayload) => void;
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
};

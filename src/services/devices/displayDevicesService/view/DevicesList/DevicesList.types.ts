import { BuildingByFilterResponse } from 'api/types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import {
  DevicesByAddressInterface,
  NodesListRequestPayload,
} from '../../displayDevicesService.types';

export type DevicesListProps = {
  housingStocksDevices: DevicesByAddressInterface[];
  housingStocksAddressForSwitcher: BuildingByFilterResponse[];
  isLoading: boolean;
  total?: number;
  pageNumber?: number;
  pageSize?: number;
  setPageNumber: (pageNumber: number) => void;
  setAddressBySwither: (address: NodesListRequestPayload) => void;
  mainFilterSearchType: DevicesSearchType;
  setMainFilterSearchType: (type: DevicesSearchType) => void;
  isDevicesFetched: boolean;
};

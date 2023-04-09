import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';

export type IndividualDevicesExtendedSearchProps = {
  devicesSearchType: DevicesSearchType;
  handleApply: (values: SearchIndividualDevicesParams) => void;
  values: SearchIndividualDevicesParams;
  handleClear?: () => void;
  mountPlaces: IndividualDeviceMountPlaceForFilterResponse[];
};

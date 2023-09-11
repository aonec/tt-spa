import { IndividualDeviceMountPlaceForFilterResponse } from 'api/types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';
import { ReactNode } from 'react';

export type IndividualDevicesExtendedSearchProps = {
  devicesSearchType: DevicesSearchType;
  handleApply: (values: SearchIndividualDevicesParams) => void;
  values: SearchIndividualDevicesParams;
  handleClear?: () => void;
  mountPlaces: IndividualDeviceMountPlaceForFilterResponse[];
  children?: ReactNode;
};

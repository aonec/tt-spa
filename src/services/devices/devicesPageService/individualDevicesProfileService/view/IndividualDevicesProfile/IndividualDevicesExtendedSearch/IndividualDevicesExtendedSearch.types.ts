import { SelectValue } from 'antd/lib/select';
import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';
import {
  DevicesSearchType,
  SearchIndividualDevicesParams,
} from '../../../individualDevicesProfileService.types';

export type IndividualDevicesExtendedSearchProps = {
  devicesSearchType: DevicesSearchType;
  handleApply: (values: SearchIndividualDevicesParams) => void;
  values: SearchIndividualDevicesParams;
  handleClear?: () => void;
  mountPlaces: IndividualDeviceMountPlaceForFilterResponse[];
};

import { SelectValue } from 'antd/lib/select';
import {
  DevicesSearchType,
  SearchIndividualDevicesParams,
} from '../../../individualDevicesProfileService.types';

export type IndividualDevicesExtendedSearchProps = {
  devicesSearchType: DevicesSearchType;
  handleApply: (values: SearchIndividualDevicesParams) => void;
  values: SearchIndividualDevicesParams;
  handleClear?: () => void;
};

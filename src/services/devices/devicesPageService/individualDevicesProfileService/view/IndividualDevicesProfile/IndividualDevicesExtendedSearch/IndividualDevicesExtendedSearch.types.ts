import { SelectValue } from 'antd/lib/select';
import {
  DevicesSearchType,
  SearchIndividualDevicesParams,
} from '../../../individualDevicesProfileService.types';

export type IndividualDevicesExtendedSearchProps = {
  devicesSearchType: DevicesSearchType;
  handleApply: (values: SearchIndividualDevicesParams) => void;
  values: SearchIndividualDevicesParams;
  onChange?: (key: string, value: string | SelectValue) => void;
  handleClear?: () => void;
};

import {
  DevicesSearchType,
  SearchIndividualDevicesParams,
} from '../../../individualDevicesProfileService.types';

export type IndividualDevicesExtendedSearchProps = {
  devicesSearchType: DevicesSearchType;
  handleApply: (values: SearchIndividualDevicesParams) => void;
  values?: SearchIndividualDevicesParams
};

import { FormEvent } from 'react';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { NodesListRequestForm, NodesListRequestPayload } from 'services/devices/displayDevicesService/displayDevicesService.types';

export type SearchDevicesProps = {
  isExtendedSearchOpen: boolean;
  submitForm: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  values: NodesListRequestForm;
  diametersConfig: DiamtersConfig;
  devicesSearchType: DevicesSearchType;
  setSerialNumber: (value: string) => void;
  serialNumber: string;
  handleClear: () => void;
  isSearchError: boolean;
};

import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { FormikErrors } from 'formik';
import { FormEvent } from 'react';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';

export type SearchDevicesProps = {
  isExtendedSearchOpen: boolean;
  submitForm: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  values: CalculatorsListRequestPayload;
  devicesSearchType: DevicesSearchType;
  setSerialNumber: (value: string) => void;
  serialNumber: string;
};

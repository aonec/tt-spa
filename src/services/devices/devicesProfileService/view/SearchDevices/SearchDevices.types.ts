import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { FormikErrors } from 'formik';
import { FormEvent } from 'react';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';

export type SearchDevicesProps = {
  isExtendedSearchOpen: boolean;
  submitForm: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<CalculatorsListRequestPayload>>;
  values: CalculatorsListRequestPayload;
  diametersConfig: DiamtersConfig;
};

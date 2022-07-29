import { FormikErrors } from "formik";
import { FormEvent, ReactNode } from "react";
import { CalculatorsListRequestPayload } from "../../../../../01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types";

export type SearchDevicesProps = {
  isExtendedSearchOpen: boolean;
  submitForm: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<CalculatorsListRequestPayload>>;
  values: CalculatorsListRequestPayload;
  children: ReactNode;
};

import { EExpiresCheckingDateAt } from 'api/types';
import { Moment } from 'moment';
import { CalculatorsListRequestForm } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';

export type ExtendedSearchFormProps = {
  values: CalculatorsListRequestForm;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  diametersConfig: DiamtersConfig;
  housingMeteringDevicesModels: string[];
  handleFetchModels: (payload: string) => void;
};

export type RangeValue = [Moment | null, Moment | null] | null;

export type ExpiresCheckingPeriodSegmented =
  | EExpiresCheckingDateAt.NextMonth
  | EExpiresCheckingDateAt.NextTwoMonth
  | EExpiresCheckingDateAt.Past
  | '';

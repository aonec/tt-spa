import { EExpiresDateAt } from 'api/types';
import { Moment } from 'moment';
import { CalculatorsListRequestForm } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';

export type ExtendedSearchFormProps = {
  values: CalculatorsListRequestForm;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  diametersConfig: DiamtersConfig;
  calculatorsModels: string[];
  handleFetchModels: (payload: string) => void;
};

export type RangeValue = [Moment | null, Moment | null] | null;

export type ExpiresCheckingPeriodSegmented =
  | EExpiresDateAt.NextMonth
  | EExpiresDateAt.NextTwoMonth
  | EExpiresDateAt.Past
  | '';

export enum ESelectedDateType {
  ExpiresCheckingDateAt = 'ExpiresCheckingDate',
  ExpiresAdmissionActDateAt = 'ExpiresAdmissionActDateAt',
  NonSelected = 'NonSelected',
}

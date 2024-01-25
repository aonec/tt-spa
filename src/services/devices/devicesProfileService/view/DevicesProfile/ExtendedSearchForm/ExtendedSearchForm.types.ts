import { EExpiresDateAt } from 'api/types';
import { Dayjs } from 'dayjs';
import { DiamtersConfig } from 'services/currentOrganizationService/currentOrganizationService.types';
import { NodesListRequestForm } from 'services/devices/displayDevicesService/displayDevicesService.types';

export type ExtendedSearchFormProps = {
  values: NodesListRequestForm;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  diametersConfig: DiamtersConfig;
  calculatorsModels: string[];
  handleFetchModels: (payload: string) => void;
  dateType: ESelectedDateType;
  setDateType: React.Dispatch<React.SetStateAction<ESelectedDateType>>;
};

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

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

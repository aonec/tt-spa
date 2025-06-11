import {
  EOrderByRule,
  IndividualDevicesConstructedReportResponse,
} from 'api/types';

export type Props = {
  individualDevicesReportData: IndividualDevicesConstructedReportResponse[];
  isOperators: boolean;
};

export type FormValues = {
  addressOrderBy: EOrderByRule | null;
  lastCheckOrderBy: EOrderByRule | null;
  nextCheckOrderBy: EOrderByRule | null;
};

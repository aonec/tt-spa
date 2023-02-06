import {
  EClosingReason,
  EIndividualDeviceReportOption,
  EResourceType,
} from 'myApi';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';

export enum ReportDatePeriod {
  LastDay = 'LastDay',
  LastSevenDays = 'LastSevenDays',
  FromStartOfMonth = 'FromStartOfMonth',
  PreviousMonth = 'PreviousMonth',
  AnyPeriod = 'AnyPeriod',
}

export type ReportFiltrationFormValues = {
  city: null | string;
  houseManagement: null | string;
  housingStockId: null | number;
  resources: EResourceType[];
  reportOption: null | EIndividualDeviceReportOption;
  from: null | moment.Moment;
  to: null | moment.Moment;
  reportDatePeriod: null | ReportDatePeriod;
  closingReasons: EClosingReason[]
};

export type ReportPayload = {
  values: ReportFiltrationFormValues;
  reportType: ReportType;
};

export type IndividualDeviceReportRequestPaload = {
  HouseManagementId?: string;
  HousingStockId?: number;
  ReportOption: EIndividualDeviceReportOption;
  Resources?: EResourceType[];
  From?: string;
  To?: string;
  ClosingReasons?: EClosingReason[];
};

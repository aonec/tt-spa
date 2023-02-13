import {
  EActResourceType,
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
  actResources: EActResourceType[];
  reportOption: null | EIndividualDeviceReportOption;
  from: null | moment.Moment;
  to: null | moment.Moment;
  reportDatePeriod: null | ReportDatePeriod;
  closingReasons: EClosingReason[];
  showOnlyDuplicates: boolean;
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

export type ActsJournalReportRequestPayload = {
  HouseManagementId?: string;
  HousingStockId?: number;
  Resources?: EActResourceType[];
  From?: string;
  To?: string;
};

export type HousingMeteringDevicesReportRequestPayload = {
  HouseManagementId?: string;
  HousingStockId?: number;
  Resources?: EResourceType[];
  From: string;
  To: string;
};

export type HomeownersReportRequestPayload = {
  HouseManagementId?: string;
  HousingStockId?: number;
  ShowOnlyDuplicates: boolean;
};

import {
  CallCenterWorkingConstructedReportResponse,
  EActResourceType,
  EClosingReason,
  EIndividualDeviceReportOption,
  EResourceType,
  HouseManagementConstructedReportResponse,
  InspectorsConstructedReportResponse,
  OperatorsConstructedReportResponse,
} from 'myApi';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
} from './view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';

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
  housingStockIds: number[];
  resources: EResourceType[];
  actResources: EActResourceType[];
  reportOption: null | EIndividualDeviceReportOption;
  from: null | moment.Moment;
  to: null | moment.Moment;
  reportDatePeriod: null | ReportDatePeriod;
  closingReasons: EClosingReason[];
  showOnlyDuplicates: boolean;
  withoutApartmentsWithOpenDevicesByResources: boolean;
  employeeReportType: EmployeeReportType | null;
  employeeReportDatePeriodType: EmployeeReportDatePeriodType | null;
  employeeReportDate: moment.Moment | null;
};

export type ReportPayload = {
  values: ReportFiltrationFormValues;
  reportType: ReportType;
};

export type IndividualDeviceReportRequestPaload = {
  HouseManagementId?: string;
  HousingStocksIds?: number[];
  ReportOption: EIndividualDeviceReportOption;
  Resources?: EResourceType[];
  From?: string;
  To?: string;
  ClosingReasons?: EClosingReason[];
  WithoutApartmentsWithOpenDevicesByResources?: boolean;
};

export type ActsJournalReportRequestPayload = {
  HouseManagementId?: string;
  HousingStockId?: number;
  Resources?: EActResourceType[];
  HousingStocksIds?: number[];
  From?: string;
  To?: string;
};

export type HousingMeteringDevicesReportRequestPayload = {
  HouseManagementId?: string;
  HousingStockId?: number;
  HousingStocksIds?: number[];
  Resources?: EResourceType[];
  From: string;
  To: string;
};

export type HomeownersReportRequestPayload = {
  HouseManagementId?: string;
  HousingStockId?: number;
  HousingStocksIds?: number[];
  ShowOnlyDuplicates: boolean;
  From?: string;
  To?: string;
};

export type EmployeeReportRequestPayload = {
  employeeReportType: EmployeeReportType;
  From?: string;
  To?: string;
};

export type EmployeeReportResponse = {
  [EmployeeReportType.OperatorsWorkingReport]?: OperatorsConstructedReportResponse[];
  [EmployeeReportType.InspectorsWorkingReport]?: InspectorsConstructedReportResponse[];
  [EmployeeReportType.CallCenterWorkingReport]?: CallCenterWorkingConstructedReportResponse[];
  [EmployeeReportType.HouseManagementsReport]?: HouseManagementConstructedReportResponse[];
};

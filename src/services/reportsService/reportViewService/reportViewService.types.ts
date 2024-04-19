import {
  CallCenterWorkingConstructedReportResponse,
  EActResourceType,
  EClosingReason,
  EIndividualDeviceReportOption,
  EResourceType,
  HouseManagementConstructedReportResponse,
  InspectorsConstructedReportResponse,
  OperatorsConstructedReportResponse,
} from 'api/types';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
} from './view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';
import dayjs from 'api/dayjs';

export enum ReportDatePeriod {
  LastDay = 'LastDay',
  LastSevenDays = 'LastSevenDays',
  FromStartOfMonth = 'FromStartOfMonth',
  PreviousMonth = 'PreviousMonth',
  Expired = 'Expired',
  ExpiresInNextMonth = 'ExpiresInNextMonth',
  ExpiresInNextTwoMonth = 'ExpiresInNextTwoMonth',
  AnyPeriod = 'AnyPeriod',
}

export enum ExportReportType {
  ManagementFirm = 'ManagementFirm',
  HouseManagement = 'HouseManagement',
  Address = 'Address',
}

export interface ReportFiltrationFormValues {
  exportType: ExportReportType | null;
  city: null | string;
  organizationId: null | number;
  houseManagement: null | string;
  housingStockId: number | null;
  resources: EResourceType[];
  actResources: EActResourceType[];
  reportOption: null | EIndividualDeviceReportOption;
  from: null | dayjs.Dayjs;
  to: null | dayjs.Dayjs;
  reportDatePeriod: null | ReportDatePeriod;
  closingReasons: EClosingReason[];
  showOnlyDuplicates: boolean;
  withoutApartmentsWithOpenDevicesByResources: boolean;
  employeeReportType: EmployeeReportType | null;
  employeeReportDatePeriodType: EmployeeReportDatePeriodType | null;
  employeeReportDate: dayjs.Dayjs | null;
  reportType?: ReportType;
}

export interface AddressSearch {
  ManagementFirmId: number | null;
  HouseManagementId: string | null;
  HousingStockId: number | null;
}

export interface ReportPayload {
  values: ReportFiltrationFormValues;
  reportType: ReportType;
}

export interface IndividualDeviceReportRequestPaload extends AddressSearch {
  ReportOption: EIndividualDeviceReportOption;
  Resources?: EResourceType[];
  From?: string | null;
  To?: string | null;
  ClosingReasons?: EClosingReason[];
  WithoutApartmentsWithOpenDevicesByResources?: boolean;
}

export interface ActsJournalReportRequestPayload extends AddressSearch {
  Resources?: EActResourceType[];
  From?: string | null;
  To?: string | null;
}

export interface HousingMeteringDevicesReportRequestPayload
  extends AddressSearch {
  Resources?: EResourceType[];
  From: string | null;
  To: string | null;
}

export interface HomeownersReportRequestPayload extends AddressSearch {
  ShowOnlyDuplicates: boolean;
  From?: string | null;
  To?: string | null;
}

export interface EmployeeReportRequestPayload {
  employeeReportType: EmployeeReportType;
  From?: string;
  To?: string;
}

export type EmployeeReportResponse = {
  [EmployeeReportType.OperatorsWorkingReport]?: OperatorsConstructedReportResponse[];
  [EmployeeReportType.InspectorsWorkingReport]?: InspectorsConstructedReportResponse[];
  [EmployeeReportType.CallCenterWorkingReport]?: CallCenterWorkingConstructedReportResponse[];
  [EmployeeReportType.HouseManagementsReport]?: HouseManagementConstructedReportResponse[];
};

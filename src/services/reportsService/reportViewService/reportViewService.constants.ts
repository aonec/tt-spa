import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import {
  ExportReportType,
  ReportFiltrationFormValues,
} from './reportViewService.types';
import {
  prepareActJournalReportRequestPayload,
  prepareEmployeeReportRequestPayload,
  prepareHomeownersReportRequestPayload,
  prepareHousingMeteringDevicesReportRequestPayload,
  prepareIndividualDevicesReportRequestPayload,
} from './reportViewService.utils';
import { EmployeeReportType } from './view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';

export const DownloadReportUrlsDictionary: {
  [key in ReportType]: string | null;
} = {
  [ReportType.ActsJournal]: 'Reports/ApartmentActsReportXlsx',
  [ReportType.Employee]: null,
  [ReportType.Homeowners]: 'Reports/HomeownersReportXlsx',
  [ReportType.HousingDevices]: 'Reports/HousingDevicesReportXlsx',
  [ReportType.IndividualDevices]: 'Reports/IndividualDevicesReportXlsx',
};

export const DownloadEmployeeReportUrlsDictionary = {
  [EmployeeReportType.CallCenterWorkingReport]:
    'Reports/CallCenterWorkingReportXlsx',
  [EmployeeReportType.HouseManagementsReport]:
    'Reports/HouseManagementsReportXlsx',
  [EmployeeReportType.InspectorsWorkingReport]:
    'Reports/InspectorsWorkingReportXlsx',
  [EmployeeReportType.OperatorsWorkingReport]:
    'Reports/OperatorsWorkingReportXlsx',
};

export const PrepareReportRequestFunctionsDictionary: {
  [key in ReportType]: (values: ReportFiltrationFormValues) => {
    From?: string | null;
    To?: string | null;
    employeeReportType?: EmployeeReportType;
  } | null;
} = {
  [ReportType.ActsJournal]: prepareActJournalReportRequestPayload,
  [ReportType.Employee]: prepareEmployeeReportRequestPayload,
  [ReportType.Homeowners]: prepareHomeownersReportRequestPayload,
  [ReportType.HousingDevices]:
    prepareHousingMeteringDevicesReportRequestPayload,
  [ReportType.IndividualDevices]: prepareIndividualDevicesReportRequestPayload,
};

export const ExportReportTypeTranslatesLookup: {
  [key in keyof typeof ExportReportType]: string;
} = {
  [ExportReportType.ManagementFirm]: 'По всей УК',
  [ExportReportType.HouseManagement]: 'По домоуправлению',
  [ExportReportType.Address]: 'По адресу',
};

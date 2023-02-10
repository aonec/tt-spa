import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { ReportFiltrationFormValues } from './reportViewService.types';
import {
  prepareActJournalReportRequestPayload,
  prepareEmployeeReportRequestPayload,
  prepareHomeownersReportRequestPayload,
  prepareHousingMeteringDevicesReportRequestPayload,
  prepareIndividualDevicesReportRequestPayload,
} from './reportViewService.utils';

export const DownloadReportUrlsDictionary: { [key in ReportType]: string } = {
  [ReportType.ActsJournal]: 'Reports/ApartmentActsReportXlsx',
  [ReportType.Employee]: 'Reports/EmployeeReportXlsx',
  [ReportType.Homeowners]: 'Reports/HomeownersReportXlsx',
  [ReportType.HousingDevices]: 'Reports/HousingDevicesReportXlsx',
  [ReportType.IndividualDevices]: 'Reports/IndividualDevicesReportXlsx',
};

export const PrepareReportRequestFunctionsDictionary: {
  [key in ReportType]: (values: ReportFiltrationFormValues) => object | null;
} = {
  [ReportType.ActsJournal]: prepareActJournalReportRequestPayload,
  [ReportType.Employee]: prepareEmployeeReportRequestPayload,
  [ReportType.Homeowners]: prepareHomeownersReportRequestPayload,
  [ReportType.HousingDevices]:
    prepareHousingMeteringDevicesReportRequestPayload,
  [ReportType.IndividualDevices]: prepareIndividualDevicesReportRequestPayload,
};

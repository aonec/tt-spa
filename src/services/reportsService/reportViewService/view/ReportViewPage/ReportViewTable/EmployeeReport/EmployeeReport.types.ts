import { EmployeeReportResponse } from 'services/reportsService/reportViewService/reportViewService.types';
import { EmployeeReportType } from '../../ReportFiltrationForm/ReportFiltrationForm.types';

export type EmployeeReportProps = {
  emloyeeReportData: EmployeeReportResponse | null;
  employeeReportType: EmployeeReportType | null;
};

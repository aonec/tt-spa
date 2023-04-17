import React, { FC, ReactNode } from 'react';
import { ReportViewTableProps } from './ReportViewTable.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { IndividualDevicesReport } from './IndividualDevicesReport';
import { Wrapper } from './ReportViewTable.styled';
import { ActsJournalReport } from './ActsJournalReport';
import { HousingMeteringDevicesReport } from './HousingMeteringDevicesReport';
import { HomeownersReport } from './HomeownersReport';
import { EmployeeReport } from './EmployeeReport/EmployeeReport';

export const ReportViewTable: FC<ReportViewTableProps> = ({
  individualDevicesReportData,
  reportType,
  reportOption,
  actJournalReportData,
  housingMeteringDevicesReportData,
  homeownersReportData,
  emloyeeReportData,
  employeeReportType,
}) => {
  const reportTableComponents: { [key in ReportType]: ReactNode } = {
    [ReportType.IndividualDevices]: (
      <IndividualDevicesReport
        individualDevicesReportData={individualDevicesReportData}
        reportOption={reportOption}
      />
    ),
    [ReportType.ActsJournal]: (
      <ActsJournalReport actJournalReportData={actJournalReportData} />
    ),
    [ReportType.HousingDevices]: (
      <HousingMeteringDevicesReport
        housingMeteringDevicesReportData={housingMeteringDevicesReportData}
      />
    ),
    [ReportType.Homeowners]: (
      <HomeownersReport homeownersReportData={homeownersReportData} />
    ),
    [ReportType.Employee]: (
      <EmployeeReport
        emloyeeReportData={emloyeeReportData}
        employeeReportType={employeeReportType}
      />
    ),
  };

  return <Wrapper>{reportTableComponents[reportType]}</Wrapper>;
};

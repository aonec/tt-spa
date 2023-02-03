import React, { FC, ReactNode } from 'react';
import { ReportViewTableProps } from './ReportViewTable.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { IndividualDevicesReport } from './IndividualDevicesReport';

export const ReportViewTable: FC<ReportViewTableProps> = ({
  individualDevicesReportData,
  reportType,
  city,
  reportOption,
}) => {
  const reportTableComponents: { [key in ReportType]: ReactNode } = {
    [ReportType.IndividualDevices]: (
      <IndividualDevicesReport
        individualDevicesReportData={individualDevicesReportData}
        city={city}
        reportOption={reportOption}
      />
    ),
    [ReportType.HousingDevices]: null,
    [ReportType.ActsJournal]: null,
    [ReportType.Employee]: null,
    [ReportType.Homeowners]: null,
  };

  return <>{reportTableComponents[reportType]}</>;
};

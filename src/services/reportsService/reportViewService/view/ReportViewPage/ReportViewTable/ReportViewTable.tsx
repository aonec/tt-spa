import React, { FC, ReactNode } from 'react';
import { ReportViewTableProps } from './ReportViewTable.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { IndividualDevicesReport } from './IndividualDevicesReport';
import { Wrapper } from './ReportViewTable.styled';
import { ActsJournalReport } from './ActsJournalReport';

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
    [ReportType.ActsJournal]: <ActsJournalReport />,
    [ReportType.HousingDevices]: null,
    [ReportType.Employee]: null,
    [ReportType.Homeowners]: null,
  };

  return <Wrapper>{reportTableComponents[reportType]}</Wrapper>;
};

import React, { FC, ReactNode } from 'react';
import { ReportViewTableProps } from './ReportViewTable.types';
import { Empty } from 'antd';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { IndividualDevicesReport } from './IndividualDevicesReport';

export const ReportViewTable: FC<ReportViewTableProps> = ({
  individualDevicesReportData,
  reportType,
}) => {
  const reportTableComponents: { [key in ReportType]: ReactNode } = {
    [ReportType.IndividualDevices]: (
      <IndividualDevicesReport
        individualDevicesReportData={individualDevicesReportData}
      />
    ),
    [ReportType.HousingDevices]: null,
    [ReportType.ActsJournal]: null,
    [ReportType.Employee]: null,
    [ReportType.Homeowners]: null,
  };

  const reportTable = reportTableComponents[reportType];

  return (
    <div>
      {!reportTable && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Выберите фильтры для формирования отчёта"
        />
      )}
      {reportTable}
    </div>
  );
};

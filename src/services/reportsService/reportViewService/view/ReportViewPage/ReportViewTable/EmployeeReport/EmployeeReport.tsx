import { Empty } from 'antd';
import React, { FC } from 'react';
import { EmployeeReportType } from '../../ReportFiltrationForm/ReportFiltrationForm.types';
import { CallCenterWorkingReportTable } from './CallCenterWorkingReportTable';
import { EmployeeReportProps } from './EmployeeReport.types';
import { HouseManagementsReportTable } from './HouseManagementsReportTable';
import { InspectorsWorkingReportTable } from './InspectorsWorkingReportTable';
import { OperatorsWorkingReportTable } from './OperatorsWorkingReportTable';

export const EmployeeReport: FC<EmployeeReportProps> = ({
  emloyeeReportData,
  employeeReportType,
}) => {
  const empty = (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Выберите фильтры для формирования отчета"
    />
  );

  if (!emloyeeReportData || !employeeReportType) {
    return empty;
  }

  const reportTableCompponentsDictionary = {
    [EmployeeReportType.OperatorsWorkingReport]: OperatorsWorkingReportTable,
    [EmployeeReportType.CallCenterWorkingReport]: CallCenterWorkingReportTable,
    [EmployeeReportType.InspectorsWorkingReport]: InspectorsWorkingReportTable,
    [EmployeeReportType.HouseManagementsReport]: HouseManagementsReportTable,
  };

  const TableComponent =
    employeeReportType && reportTableCompponentsDictionary[employeeReportType];

  if (!TableComponent) return empty;

  return <TableComponent data={emloyeeReportData} />;
};

import { Empty } from 'antd';
import React, { FC } from 'react';
import { EmployeeReportType } from '../../ReportFiltrationForm/ReportFiltrationForm.types';
import { EmployeeReportProps } from './EmployeeReport.types';
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
    [EmployeeReportType.CallCenterWorkingReport]: OperatorsWorkingReportTable,
    [EmployeeReportType.InspectorsWorkingReport]: InspectorsWorkingReportTable,
    [EmployeeReportType.HouseManagementsReport]: OperatorsWorkingReportTable,
  };

  const TableComponent =
    employeeReportType && reportTableCompponentsDictionary[employeeReportType];

  if (!TableComponent) return empty;

  return <TableComponent data={emloyeeReportData} />;
};

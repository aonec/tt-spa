import { Pagination } from 'ui-kit/Pagination';
import { useUnit } from 'effector-react';
import React, { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { PAGE_SIZE } from './reportsListService.constants';
import { reportsListService } from './reportsListService.model';
import { ReportStatusType } from './reportsListService.types';
import { ReportsList } from './view/ReportsList';
import { TabsSC } from './reportsListService.styled';
import { reportViewService } from 'services/reportsService/reportViewService';
import { ReportFiltrationFormValues } from 'services/reportsService/reportViewService/reportViewService.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
} from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';
import { createRunnerService } from '../../reportsService/createRunnerService/createRunnerService.models';

const { outputs, gates, inputs } = reportsListService;
const { ReportsHistoryGate } = gates;

export const ReportsListContainer = () => {
  const {
    reportsHistoryListPagedData,
    isLoading,
    pageNumber,
    isShowActual,
    openExistedReport,
    setPageNumber,
    setIsShowActual,
    filtrationValues,
    setRunnerModalOpen,
    runnerStageNumber,
  } = useUnit({
    reportsHistoryListPagedData: outputs.$reportsHistoryPagedData,
    isLoading: outputs.$isLoading,
    pageNumber: outputs.$pageNumber,
    isShowActual: outputs.$isShowActual,
    openExistedReport: inputs.openExistedReport,
    setPageNumber: inputs.setPageNumber,
    setIsShowActual: inputs.setIsShowActual,
    filtrationValues: reportViewService.outputs.$filtrationValues,
    setRunnerModalOpen: createRunnerService.inputs.setOpen,
    runnerStageNumber: createRunnerService.outputs.$stageNumber,
  });

  const navigate = useNavigate();

  useEffect(() => {
    return inputs.openExistedReport.watch((data) => {
      const type = data.type;

      const isEmployeeReport = Boolean(
        EmployeeReportType[type as keyof typeof EmployeeReportType],
      );

      if (isEmployeeReport) {
        const { from, to } = data;

        const dateRange = dayjs(to).diff(from, 'month');

        const employeeReportDatePeriodType =
          dateRange > 1
            ? EmployeeReportDatePeriodType.Year
            : EmployeeReportDatePeriodType.Month;

        const employeeReportDate = dayjs(from);

        const dataForOpenEmployeeReportType: ReportFiltrationFormValues = {
          ...filtrationValues,
          reportType: ReportType.Employee,
          from: dayjs(from),
          to: dayjs(to),
          employeeReportType:
            EmployeeReportType[type as keyof typeof EmployeeReportType],
          employeeReportDate,
          employeeReportDatePeriodType,
        };
        reportViewService.inputs.setFiltrationValues(
          dataForOpenEmployeeReportType,
        );
        navigate('/reports/Employee');
      }
    }).unsubscribe;
  }, [navigate, filtrationValues]);

  const archivedReportsCountString = useMemo(() => {
    const archivedReportsCount =
      reportsHistoryListPagedData?.totalDeprecatedReports;

    if (!archivedReportsCount) return '';

    return `(${archivedReportsCount})`;
  }, [reportsHistoryListPagedData]);

  const tabItems = useMemo(
    () => [
      { label: 'Актуальные отчеты', key: ReportStatusType.Actual },
      {
        label: `Архивные отчеты ${archivedReportsCountString}`,
        key: ReportStatusType.Archived,
      },
    ],
    [archivedReportsCountString],
  );

  return (
    <>
      <ReportsHistoryGate />
      <TabsSC
        activeKey={
          isShowActual ? ReportStatusType.Actual : ReportStatusType.Archived
        }
        onChange={(key) => setIsShowActual(key === ReportStatusType.Actual)}
        items={tabItems}
      />

      <ReportsList
        reportsList={reportsHistoryListPagedData?.items || null}
        isLoading={isLoading}
        openExistedReport={openExistedReport}
        setRunnerModalOpen={setRunnerModalOpen}
        runnerStageNumber={runnerStageNumber}
      />
      {Boolean(reportsHistoryListPagedData?.items?.length) && (
        <Pagination
          pageSize={PAGE_SIZE}
          onChange={setPageNumber}
          current={pageNumber}
          total={reportsHistoryListPagedData?.totalItems}
          showSizeChanger={false}
          style={{ marginTop: 16 }}
        />
      )}
    </>
  );
};

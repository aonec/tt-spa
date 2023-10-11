import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { useEffect, useMemo } from 'react';
import { PAGE_SIZE } from './reportsListService.constants';
import { reportsListService } from './reportsListService.model';
import { ReportStatusType } from './reportsListService.types';
import { ReportsList } from './view/ReportsList';
import { TabsSC } from './reportsListService.styled';
import { useHistory } from 'react-router-dom';
import { reportViewService } from 'services/reportsService/reportViewService';
import { ReportFiltrationFormValues } from 'services/reportsService/reportViewService/reportViewService.types';
import dayjs from 'dayjs';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
} from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';
import {
  EClosingReason,
  EIndividualDeviceReportOption,
  EResourceType,
} from 'api/types';

const { TabPane } = TabsSC;

const { outputs, gates, inputs } = reportsListService;
const { ReportsHistoryGate } = gates;

export const ReportsListContainer = () => {
  const reportsHistoryListPagedData = useStore(
    outputs.$reportsHistoryPagedData,
  );
  const isLoading = useStore(outputs.$isLoading);
  const pageNumber = useStore(outputs.$pageNumber);
  const isShowActual = useStore(outputs.$isShowActual);

  const openExistedReport = useEvent(inputs.openExistedReport);
  const setPageNumber = useEvent(inputs.setPageNumber);
  const setIsShowActual = useEvent(inputs.setIsShowActual);

  const filtrationValues = useStore(
    reportViewService.outputs.$filtrationValues,
  );

  const history = useHistory();
  useEffect(() => {
    return inputs.openExistedReport.watch((data) => {
      const type = data.type;

      const isEmployeeReport = Boolean(
        EmployeeReportType[type as keyof typeof EmployeeReportType],
      );
      const isIndividualDevicesReport = type === 'ClosedDevicesReport'; // hardcode на ClosedDevicesReport тк enum не совпадает

      const isActsJournalReport = Boolean(
        EmployeeReportType[type as keyof typeof EmployeeReportType],
      );

      const isHousingDevicesReport = Boolean(
        EmployeeReportType[type as keyof typeof EmployeeReportType],
      );

      const isHomeownersReport = Boolean(
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
        history.push('/reports/Employee');
      }

      if (isIndividualDevicesReport) {
        const {
          from,
          to,
          closingReasons,
          resources,
          withoutApartmentsWithOpenDevicesByResources,
          housingStockId,
          managementFirmId,
          houseManagementId,
        } = data;

        const closingReasonsArr = closingReasons
          .split('/')
          .map(
            (reason) => EClosingReason[reason as keyof typeof EClosingReason],
          );
        const resourcesArr = resources
          .split('/')
          .map(
            (resource) => EResourceType[resource as keyof typeof EResourceType],
          );
        const withoutApartmentsWithOpenDevicesByResourcesBoolean =
          withoutApartmentsWithOpenDevicesByResources === 'True';

        const dataForOpenEmployeeReportType: ReportFiltrationFormValues = {
          ...filtrationValues,
          reportType: ReportType.IndividualDevices,
          from: dayjs(from),
          to: dayjs(to),
          // reportOption:
          //   EIndividualDeviceReportOption[
          //     type as keyof typeof EIndividualDeviceReportOption
          //   ],
          reportOption: EIndividualDeviceReportOption.ClosedDevices,
          // closingReasons: closingReasonsArr,
          closingReasons: [EClosingReason.CertificateIssued],
          // resources: resourcesArr,
          resources: [EResourceType.ColdWaterSupply],
          withoutApartmentsWithOpenDevicesByResources:
            withoutApartmentsWithOpenDevicesByResourcesBoolean,
          housingStockIds: [Number(housingStockId)],
          houseManagement: houseManagementId,
        };

        reportViewService.inputs.setFiltrationValues(
          dataForOpenEmployeeReportType,
        );
        history.push('/reports/IndividualDevices');
      }
    }).unsubscribe;
  }, [history, filtrationValues]);

  const archivedReportsCountString = useMemo(() => {
    const archivedReportsCount =
      reportsHistoryListPagedData?.totalDeprecatedReports;

    if (!archivedReportsCount) return '';

    return `(${archivedReportsCount})`;
  }, [reportsHistoryListPagedData]);

  return (
    <>
      <ReportsHistoryGate />
      <TabsSC
        activeKey={
          isShowActual ? ReportStatusType.Actual : ReportStatusType.Archived
        }
        onChange={(key) => setIsShowActual(key === ReportStatusType.Actual)}
      >
        <TabPane tab="Актуальные отчеты" key={ReportStatusType.Actual} />
        <TabPane
          tab={`Архивные отчеты ${archivedReportsCountString}`}
          key={ReportStatusType.Archived}
        />
      </TabsSC>
      <ReportsList
        reportsList={reportsHistoryListPagedData?.items || null}
        isLoading={isLoading}
        openExistedReport={openExistedReport}
      />
      {Boolean(reportsHistoryListPagedData?.items?.length) && (
        <Pagination
          pageSize={PAGE_SIZE}
          onChange={setPageNumber}
          current={pageNumber}
          total={reportsHistoryListPagedData?.totalItems}
          showSizeChanger={false}
        />
      )}
    </>
  );
};

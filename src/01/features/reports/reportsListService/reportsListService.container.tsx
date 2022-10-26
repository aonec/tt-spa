import { Pagination, Tabs } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { PAGE_SIZE } from './reportsListService.constants';
import { reportsListService } from './reportsListService.model';
import { ReportStatusType } from './reportsListService.types';
import { ReportsList } from './view/ReportsList';
import { SearchReports } from './view/SearchReports';

const { outputs, gates, inputs } = reportsListService;
const { ReportsHistoryGate } = gates;

export const ReportsListContainer = () => {
  const reportsHistoryListPagedData = useStore(
    outputs.$reportsHistoryPagedData
  );
  const isLoading = useStore(outputs.$isLoading);
  const pageNumber = useStore(outputs.$pageNumber);
  const isShowActual = useStore(outputs.$isShowActual);
  const reportName = useStore(outputs.$reportNameText);

  const openExistedReport = useEvent(inputs.openExistedReport);
  const setPageNumber = useEvent(inputs.setPageNumber);
  const setIsShowActual = useEvent(inputs.setIsShowActual);
  const setReportName = useEvent(inputs.setReportNameText);

  const archivedReportsCountString = useMemo(() => {
    const archivedReportsCount =
      reportsHistoryListPagedData?.totalDeprecatedReports;

    if (!archivedReportsCount) return '';

    return `(${archivedReportsCount})`;
  }, [reportsHistoryListPagedData]);

  return (
    <>
      <ReportsHistoryGate />
      <SearchReports reportName={reportName} setReportName={setReportName} />
      <Tabs
        activeKey={
          isShowActual ? ReportStatusType.Actual : ReportStatusType.Archived
        }
        onChange={(key) =>
          setIsShowActual(key === ReportStatusType.Actual ? true : false)
        }
      >
        <Tabs.TabPane tab="Актуальные отчеты" key={ReportStatusType.Actual} />
        <Tabs.TabPane
          tab={`Архивные отчеты ${archivedReportsCountString}`}
          key={ReportStatusType.Archived}
        />
      </Tabs>
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
        />
      )}
    </>
  );
};

import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { PAGE_SIZE } from './reportsListService.constants';
import { reportsListService } from './reportsListService.model';
import { ReportStatusType } from './reportsListService.types';
import { ReportsList } from './view/ReportsList';
import { TabsSC } from './reportsListService.styled';

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

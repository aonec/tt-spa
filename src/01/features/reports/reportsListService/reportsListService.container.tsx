import { useStore } from 'effector-react';
import React from 'react';
import { reportsListService } from './reportsListService.model';
import { ReportsList } from './view/ReportsList';
import { SearchReports } from './view/SearchReports';

const { outputs, gates } = reportsListService;
const { ReportsHistoryGate } = gates;

export const ReportsListContainer = () => {
  const reportsHistoryListPagedData = useStore(
    outputs.$reportsHistoryPagedData
  );
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      <ReportsHistoryGate />
      <SearchReports />
      <ReportsList
        reportsList={reportsHistoryListPagedData?.items || null}
        isLoading={isLoading}
      />
    </>
  );
};

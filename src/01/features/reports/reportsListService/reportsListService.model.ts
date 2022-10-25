import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { ReportRequestHistoryResponsePagedList } from 'myApi';
import { getReportsHistoryList } from './reportsListService.api';

const domain = createDomain('reportsListService');

const fetchReportsHistoryList = domain.createEffect<
  void,
  ReportRequestHistoryResponsePagedList
>(getReportsHistoryList);

const setPageNumber = domain.createEvent<number>();

const ReportsHistoryGate = createGate();

const refetchReportsHistory = domain.createEvent();

const openExistedReport = domain.createEvent<Record<string, string>>();

const $reportsHistoryPagedData = domain
  .createStore<ReportRequestHistoryResponsePagedList | null>(null)
  .on(fetchReportsHistoryList.doneData, (_, data) => data)
  .reset(ReportsHistoryGate.close);

const $pageNumber = domain
  .createStore<number>(1)
  .on(setPageNumber, (_, pageNumber) => pageNumber);

sample({
  source: $pageNumber,
  clock: [ReportsHistoryGate.open, refetchReportsHistory],
  fn: (pageNumber) => {
    return {
      
    }
  },
  target: fetchReportsHistoryList,
});

const $isLoading = fetchReportsHistoryList.pending;

export const reportsListService = {
  inputs: {
    refetchReportsHistory,
    openExistedReport,
    setPageNumber,
  },
  outputs: {
    $reportsHistoryPagedData,
    $isLoading,
    $pageNumber,
  },
  gates: { ReportsHistoryGate },
};

import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { ReportRequestHistoryPagedList } from 'myApi';
import { getReportsHistoryList } from './reportsListService.api';
import { PAGE_SIZE } from './reportsListService.constants';
import { GetReportsHistoryListRequestPayload } from './reportsListService.types';

const domain = createDomain('reportsListService');

const fetchReportsHistoryList = domain.createEffect<
  GetReportsHistoryListRequestPayload,
  ReportRequestHistoryPagedList
>(getReportsHistoryList);

const setPageNumber = domain.createEvent<number>();

const ReportsHistoryGate = createGate();

const refetchReportsHistory = domain.createEvent();

const openExistedReport = domain.createEvent<Record<string, string>>();

const $reportsHistoryPagedData = domain
  .createStore<ReportRequestHistoryPagedList | null>(null)
  .on(fetchReportsHistoryList.doneData, (_, data) => data)
  .reset(ReportsHistoryGate.close);

const $pageNumber = domain
  .createStore<number>(1)
  .on(setPageNumber, (_, pageNumber) => pageNumber);

$pageNumber.watch(() => refetchReportsHistory());

sample({
  source: $pageNumber,
  clock: [ReportsHistoryGate.open, refetchReportsHistory],
  fn: (pageNumber) => {
    const payload: GetReportsHistoryListRequestPayload = {
      PageNumber: pageNumber,
      PageSize: PAGE_SIZE,
    };

    return payload;
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

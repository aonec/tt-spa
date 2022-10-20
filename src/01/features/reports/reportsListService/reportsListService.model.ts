import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { ReportRequestHistoryResponsePagedList } from 'myApi';
import { getReportsHistoryList } from './reportsListService.api';

const domain = createDomain('reportsListService');

const fetchReportsHistoryList = domain.createEffect<
  void,
  ReportRequestHistoryResponsePagedList
>(getReportsHistoryList);

const ReportsHistoryGate = createGate();

const refetchReportsHistory = domain.createEvent();

const $reportsHistoryPagedData = domain
  .createStore<ReportRequestHistoryResponsePagedList | null>(null)
  .on(fetchReportsHistoryList.doneData, (_, data) => data)
  .reset(ReportsHistoryGate.close);

forward({
  from: [ReportsHistoryGate.open, refetchReportsHistory],
  to: fetchReportsHistoryList,
});

const $isLoading = fetchReportsHistoryList.pending;

export const reportsListService = {
  inputs: { refetchReportsHistory },
  outputs: {
    $reportsHistoryPagedData,
    $isLoading,
  },
  gates: { ReportsHistoryGate },
};

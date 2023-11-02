import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample, forward } from 'effector';
import { createGate } from 'effector-react';
import { EOrderByRule, ReportRequestHistoryPagedList } from 'api/types';
import { getReportsHistoryList } from './reportsListService.api';
import { PAGE_SIZE } from './reportsListService.constants';
import { GetReportsHistoryListRequestPayload } from './reportsListService.types';

const fetchReportsHistoryList = createEffect<
  GetReportsHistoryListRequestPayload,
  ReportRequestHistoryPagedList
>(getReportsHistoryList);

const ReportsHistoryGate = createGate();

const refetchReportsHistory = createEvent();

const openExistedReport = createEvent<Record<string, string>>();

const $reportsHistoryPagedData =
  createStore<ReportRequestHistoryPagedList | null>(null)
    .on(fetchReportsHistoryList.doneData, (_, data) => data)
    .reset(ReportsHistoryGate.close);

const setIsShowActual = createEvent<boolean>();

const $isShowActual = createStore(true).on(
  setIsShowActual,
  (_, isShow) => isShow,
);

const setReportNameText = createEvent<string>();

const $reportNameText = createStore<string>('').on(
  setReportNameText,
  (_, text) => text,
);

const setPageNumber = createEvent<number>();

const $pageNumber = createStore<number>(1)
  .on(setPageNumber, (_, pageNumber) => pageNumber)
  .reset($isShowActual, $reportNameText, $reportNameText);

const $requestPayload = combine($isShowActual, $pageNumber, $reportNameText);

forward({
  from: $requestPayload,
  to: refetchReportsHistory,
});

sample({
  source: $requestPayload,
  clock: [ReportsHistoryGate.open, refetchReportsHistory],
  fn: ([isActual, pageNumber, reportNameText]) => {
    const payload: GetReportsHistoryListRequestPayload = {
      PageSize: PAGE_SIZE,
      PageNumber: pageNumber,
      IsActual: isActual,
      ReportNameText: reportNameText,
      OrderBy: EOrderByRule.Descending,
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
    setIsShowActual,
    setReportNameText,
  },
  outputs: {
    $reportsHistoryPagedData,
    $isLoading,
    $pageNumber,
    $isShowActual,
    $reportNameText,
  },
  gates: { ReportsHistoryGate },
};

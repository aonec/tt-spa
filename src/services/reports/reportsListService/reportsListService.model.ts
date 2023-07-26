import { combine, createDomain, sample, forward } from 'effector';
import { createGate } from 'effector-react';
import { EOrderByRule, ReportRequestHistoryPagedList } from 'api/types';
import { getReportsHistoryList } from './reportsListService.api';
import { PAGE_SIZE } from './reportsListService.constants';
import { GetReportsHistoryListRequestPayload } from './reportsListService.types';

const domain = createDomain('reportsListService');

const fetchReportsHistoryList = domain.createEffect<
  GetReportsHistoryListRequestPayload,
  ReportRequestHistoryPagedList
>(getReportsHistoryList);

const ReportsHistoryGate = createGate();

const refetchReportsHistory = domain.createEvent();

const openExistedReport = domain.createEvent<Record<string, string>>();

const $reportsHistoryPagedData = domain
  .createStore<ReportRequestHistoryPagedList | null>(null)
  .on(fetchReportsHistoryList.doneData, (_, data) => data)
  .reset(ReportsHistoryGate.close);

const setIsShowActual = domain.createEvent<boolean>();

const $isShowActual = domain
  .createStore(true)
  .on(setIsShowActual, (_, isShow) => isShow);

const setReportNameText = domain.createEvent<string>();

const $reportNameText = domain
  .createStore<string>('')
  .on(setReportNameText, (_, text) => text);

const setPageNumber = domain.createEvent<number>();

const $pageNumber = domain
  .createStore<number>(1)
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

import { axios } from '01/axios';
import { ReportRequestHistoryPagedList } from 'myApi';
import { GetReportsHistoryListRequestPayload } from './reportsListService.types';

export const getReportsHistoryList = (
  payload: GetReportsHistoryListRequestPayload,
): Promise<ReportRequestHistoryPagedList> =>
  axios.get('Reports/ReportRequestsHistory', { params: payload });

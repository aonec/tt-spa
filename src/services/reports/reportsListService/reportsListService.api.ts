import { axios } from 'api/axios';
import { ReportRequestHistoryPagedList } from 'api/types';
import { GetReportsHistoryListRequestPayload } from './reportsListService.types';

export const getReportsHistoryList = (
  payload: GetReportsHistoryListRequestPayload,
): Promise<ReportRequestHistoryPagedList> =>
  axios.get('Reports/ReportRequestsHistory', { params: payload });

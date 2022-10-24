import { axios } from '01/axios';
import { ReportRequestHistoryResponsePagedList } from 'myApi';

export const getReportsHistoryList = (): Promise<ReportRequestHistoryResponsePagedList> =>
  axios.get('Reports/ReportRequestsHistory');

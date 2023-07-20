import { ReportRequestHistoryResponse } from 'api/myApi';

export type ReportListItemProps = {
  report: ReportRequestHistoryResponse;
  openExistedReport: (payload: Record<string, string>) => void;
};

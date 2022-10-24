import { ReportRequestHistoryResponse } from 'myApi';

export type ReportListItemProps = {
  report: ReportRequestHistoryResponse;
  openExistedReport: (payload: Record<string, string>) => void;
};

import { ReportRequestHistoryResponse } from 'api/types';

export type ReportListItemProps = {
  report: ReportRequestHistoryResponse;
  openExistedReport: (payload: Record<string, string>) => void;
};

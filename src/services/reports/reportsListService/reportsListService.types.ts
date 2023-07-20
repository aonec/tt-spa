import { EOrderByRule, EReportName } from 'api/myApi';

export type GetReportsHistoryListRequestPayload = {
  ReportNameText?: string;
  ReportName?: EReportName;
  IsActual?: boolean;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export enum ReportStatusType {
  Actual = 'Actual',
  Archived = 'Archived',
}

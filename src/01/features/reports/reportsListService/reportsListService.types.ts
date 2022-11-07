import { EOrderByRule, EReportName } from 'myApi';

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

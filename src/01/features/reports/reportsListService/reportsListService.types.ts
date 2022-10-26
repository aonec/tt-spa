import { EOrderByRule, EReportName } from "myApi";

export type GetReportsHistoryListRequestPayload = {
    ReportNameText?: string;
    ReportName?: EReportName;
    PageNumber?: number;
    PageSize?: number;
    OrderBy?: EOrderByRule;
  }
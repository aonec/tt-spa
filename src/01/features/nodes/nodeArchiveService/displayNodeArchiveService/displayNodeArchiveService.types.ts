import { EReportFormat } from 'myApi';

export type NodeArchiveDataRow = {
  dateTimeText: string;
  dateTime: string;
  values: {
    text: string;
    doubleValue: number;
  }[];
};

export type NodeArchiveData = {
  columns: {
    text: string;
    group: string;
  }[];
  rows: NodeArchiveDataRow[];
};

export type GetNodeArchiveDataRequestParams = {
  NodeId?: number;
  ReportType?: string;
  From?: string;
  To?: string;
  ReportFormat?: EReportFormat;
};

export type LoadNodeArchiveDataPayload = {
  from?: string;
  to?: string;
};

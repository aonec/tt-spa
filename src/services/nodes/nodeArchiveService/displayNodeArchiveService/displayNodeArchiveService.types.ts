import { EReportFormat, EReportType } from 'myApi';

export type NodeArchiveDataRow = {
  dateTimeText: string;
  dateTime: string;
  values: {
    text: string;
    doubleValue: number | null;
  }[];
};

export type NodeArchiveData = {
  columns: {
    text: string;
    group: string;
  }[];
  rows: NodeArchiveDataRow[];
};

export type NodeArchivePreparedDataRow = NodeArchiveDataRow & {
  isFault: boolean;
};

export type NodeArchivePreparedData = {
  columns: {
    text: string;
    group: string;
  }[];
  rows: NodeArchivePreparedDataRow[];
};

export type GetNodeArchiveDataRequestParams = {
  NodeId?: number;
  ReportType?: EReportType;
  From?: string;
  To?: string;
  ReportFormat?: EReportFormat;
};

export type LoadNodeArchiveDataPayload = {
  from?: string;
  to?: string;
  type?: EReportType;
};

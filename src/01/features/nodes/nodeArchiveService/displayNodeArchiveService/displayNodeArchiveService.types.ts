import { EReportFormat } from 'myApi';

export type NodeArchiveData = {
  columns: {
    text: string;
    group: string;
  }[];
  rows: [
    {
      dateTimeText: string;
      dateTime: string;
      values: {
        text: string;
        doubleValue: number;
      }[];
    }
  ];
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

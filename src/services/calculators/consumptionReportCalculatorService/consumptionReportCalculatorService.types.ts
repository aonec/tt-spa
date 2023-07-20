import { CalculatorResponse, EReportFormat, EReportType } from 'api/types';

export type ConsumptionReportCalculatorServiceContainerProps = {
  calculator: CalculatorResponse | null;
};

export type GetCalculatorReportParams = {
  Name: string;
  NodeId?: number;
  ReportType?: EReportType;
  From?: string;
  To?: string;
  ReportFormat?: EReportFormat;
};

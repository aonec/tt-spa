import { EReportName } from 'myApi';
import { ReactNode } from 'react';

export type ReportsPageProps = {};

export type ReportSelectItem = {
  name: string;
  icon: ReactNode;
  reportName: EReportName;
};

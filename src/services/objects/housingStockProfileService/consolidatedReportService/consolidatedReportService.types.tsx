import { EReportType, HousingStockResponse } from 'myApi';

export type Props = {
  housingStock: HousingStockResponse;
};

export type GetConsolidatedReport = {
  Name: string;
  HousingStockId: number;
  ReportType: EReportType;
  From: string;
  To: string;
};

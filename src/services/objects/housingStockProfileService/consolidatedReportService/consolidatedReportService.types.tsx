import {
  EReportType,
  HousingStockResponse,
  NonResidentialBuildingResponse,
} from 'api/myApi';

export type Props = {
  building: HousingStockResponse | NonResidentialBuildingResponse;
};

export type GetConsolidatedReport = {
  Name: string;
  BuildingId: number;
  ReportType: EReportType;
  From: string;
  To: string;
};

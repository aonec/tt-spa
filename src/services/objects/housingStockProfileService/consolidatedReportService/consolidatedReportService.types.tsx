import {
  BuildingListResponse,
  EReportType,
  HousingStockResponse,
  NonResidentialBuildingResponse,
} from 'api/types';

export type Props = {
  building:
    | HousingStockResponse
    | NonResidentialBuildingResponse
    | BuildingListResponse;
};

export type GetConsolidatedReport = {
  Name: string;
  BuildingId: number;
  ReportType: EReportType;
  From: string;
  To: string;
};

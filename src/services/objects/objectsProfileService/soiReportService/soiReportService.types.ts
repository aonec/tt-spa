import { EOrderByRule, EResourceType, ESoiReportPeriod } from 'api/types';

export enum SoiReportType {
  HouseManagement = 'HouseManagement',
  Address = 'Address',
}

export type GetHouseManagementsRequestPayload = { City?: string };

export type GetAddressesRequestPayload = {
  Street?: string;
  City?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type CreateSoiReportRequestPayload = {
  ReportName: string;
  HouseManagementId?: string | null;
  HousingStockId?: number;
  Resource?: EResourceType;
  Month?: number;
  Year?: number;
  Period?: ESoiReportPeriod;
  NormativePerPerson?: number;
};

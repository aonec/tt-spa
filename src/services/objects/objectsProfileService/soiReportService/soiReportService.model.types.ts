import { EOrderByRule } from "myApi";

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

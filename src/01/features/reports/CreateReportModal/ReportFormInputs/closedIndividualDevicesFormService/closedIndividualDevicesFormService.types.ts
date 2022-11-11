import { EOrderByRule } from 'myApi';

export enum UnloadingType {
  AllManagingFirm = 'AllManagingFirm',
  ByHouseManagement = 'ByHouseManagement',
  ByAddress = 'ByAddress',
}

export type GetAddressesRequestPayload = {
  Street?: string;
  City?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type GetOrganizationsPayload = {
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type GetHouseManagementsPayload = {
  City?: string;
};

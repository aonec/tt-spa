import {
  ECalculatorOrderRule,
  EExpiresCheckingDateAt,
  EHouseCategory,
  ENodeCommercialAccountStatus,
  EOrderByRule,
  EResourceType,
} from 'myApi';

export interface CalculatorsListRequestPayload {
  'Filter.DiameterRange.From'?: number;
  'Filter.DiameterRange.To'?: number;
  'Filter.PipeDiameters'?: number[];
  'Filter.ExpiresCheckingDateAt'?: EExpiresCheckingDateAt;
  'Filter.Resource'?: EResourceType;
  'Filter.Model'?: string;
  'Filter.CommercialDateRange.From'?: string;
  'Filter.CommercialDateRange.To'?: string;
  'Filter.Address.City'?: string;
  'Filter.Address.Street'?: string;
  'Filter.Address.HousingStockNumber'?: string;
  'Filter.Address.Corpus'?: string;
  'Filter.Address.HouseCategory'?: EHouseCategory;
  'Filter.NodeStatus'?: ENodeCommercialAccountStatus;
  Question?: string;
  OrderRule?: ECalculatorOrderRule;
  IsConnected?: boolean;
  CountTasks?: boolean;
  IsClosed?: boolean;
  FileName?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}
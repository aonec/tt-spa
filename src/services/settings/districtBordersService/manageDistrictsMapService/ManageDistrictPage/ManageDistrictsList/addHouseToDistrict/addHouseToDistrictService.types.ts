import { EHousingStockOrderRule, EOrderByRule } from 'api/types';

export type GetBuildingFilters = {
  OrderRule?: EHousingStockOrderRule;
  City?: string;
  Street?: string;
  BuildingNumber?: string;
  Corpus?: string;
  HeatingStationId?: string;
  'TotalArea.MaxValue'?: number;
  'TotalArea.MinValue'?: number;
  'TotalArea.MeasurableUnit'?: string;
  HouseManagementId?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

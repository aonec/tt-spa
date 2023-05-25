import {
  EHouseCategory,
  EHousingStockOrderRule,
  ELivingHouseType,
  ENonResidentialHouseType,
  EOrderByRule,
} from 'myApi';

export type GetHousingStocksRequestParams = {
  OrderRule?: EHousingStockOrderRule;
  City?: string;
  Street?: string;
  HousingStockNumber?: string;
  Corpus?: string;
  HouseCategory?: EHouseCategory;
  HouseManagementId?: string;
  HeatingStationId?: string;
  'TotalArea.MaxValue'?: number;
  'TotalArea.MinValue'?: number;
  'TotalArea.MeasurableUnit'?: string;
  LivingHouseType?: ELivingHouseType;
  NonResidentialHouseType?: ENonResidentialHouseType;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

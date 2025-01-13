import {
  EHouseCategory,
  EHousingStockOrderRule,
  ELivingHouseType,
  ENonResidentialHouseType,
  EOrderByRule,
} from 'api/types';
import { AddressSearchValues } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export type GetHousingStocksRequestPayload = {
  OrderRule?: EHousingStockOrderRule | null;
  City?: string | null;
  Street?: string | null;
  BuildingNumber?: string | null;
  Corpus?: string | null;
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
};

export type SearchHousingStocksPayload = {
  pageNumber?: number;
} & AddressSearchValues;

import {
  EHouseCategory,
  EHousingStockOrderRule,
  ELivingHouseType,
  ENonResidentialHouseType,
  EOrderByRule,
} from 'myApi';
import { AddressSearchValues } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export type GetHousingStocksRequestPayload = {
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
};

export type SearchHousingStocksPayload = {
  pageNumber?: number;
} & AddressSearchValues;

import { EActResourceType, EActType, EOrderByRule } from 'myApi';

export type ActsJournalRequestParams = {
  City?: string;
  Street?: string;
  HousingStockNumber?: string;
  Corpus?: string;
  ApartmentId?: number;
  ApartmentNumber?: string;
  ActTypes?: EActType[];
  ActResourceTypes?: EActResourceType[];
  ActDateOrderBy?: EOrderByRule;
  ActJobDateOrderBy?: EOrderByRule;
  RegistryNumberOrderBy?: EOrderByRule;
  AddressOrderBy?: EOrderByRule;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
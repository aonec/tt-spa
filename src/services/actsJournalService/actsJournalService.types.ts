import { EActResourceType, EActType, EOrderByRule } from 'api/types';

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

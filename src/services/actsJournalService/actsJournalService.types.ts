import { EActResourceType, EActType, EOrderByRule } from 'api/types';

export type ActsJournalRequestParams = {
  City?: string | null;
  Street?: string | null;
  HousingStockNumber?: string | null;
  Corpus?: string | null;
  ApartmentId?: number;
  ApartmentNumber?: string | null;
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

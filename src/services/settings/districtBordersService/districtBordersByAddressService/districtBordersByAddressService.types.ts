import { EOrderByRule } from 'myApi';

export type FetchAddressQueryType = {
  City: string;
  Street?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type FilterType = {
  city?: string;
  street?: string;
  house?: string;
  corpus?: string;
};

import {
  AddressShortResponse,
  EOrderByRule,
  StreetWithBuildingNumbersResponse,
} from 'api/types';

export type FetchAddressQueryType = {
  City?: string;
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

export type CheckedHousingStocksWithStreets = {
  street: string;
  addresses: AddressShortResponse[];
};

export type CheckedHousingStocksIdWithStreetsHandler = {
  street: string | null;
  addresses: AddressShortResponse[];
};

export type HousingStocksIdsWithCoordinates = {
  id: number;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type StreetWithPreparedBuildingNumbers = Omit<
  StreetWithBuildingNumbersResponse,
  'addresses'
> & {
  addresses:
    | {
        buildingId: number;
        number: string | null;
        corpus: string | null;
        isDistributed: boolean;
      }[]
    | null;
};

import { StreetWithHousingStockNumbersResponse } from 'myApi';
import {
  FetchAddressQueryType,
  FilterType,
} from '../../districtBordersByAddressService.types';

export type DistrictBordersByAddressPageProps = {
  handleFetchAddress: (payload: FetchAddressQueryType) => void;
  addresses: StreetWithHousingStockNumbersResponse[] | null;
  setFilter: (payload: FilterType) => void;
};

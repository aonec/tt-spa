import { StreetWithHousingStockNumbersResponse } from 'myApi';
import {
  CheckedHousingStocksIdType,
  FetchAddressQueryType,
  FilterType,
} from '../../districtBordersByAddressService.types';

export type DistrictBordersByAddressPageProps = {
  handleFetchAddress: (payload: FetchAddressQueryType) => void;
  addresses: StreetWithHousingStockNumbersResponse[] | null;
  setFilter: (payload: FilterType) => void;
  setHousingStockIds: (payload: CheckedHousingStocksIdType[]) => void;
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdType[];
  handleOpenDistrictEditer: () => void;
  isAllowedToEditer: boolean;
  cityInFilter: string | undefined;
};

import { StreetWithBuildingNumbersResponse } from 'api/types';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  FetchAddressQueryType,
  FilterType,
} from '../../districtBordersByAddressService.types';

export type DistrictBordersByAddressPageProps = {
  handleFetchAddress: (payload: FetchAddressQueryType) => void;
  addresses: StreetWithBuildingNumbersResponse[] | null;
  setFilter: (payload: FilterType) => void;
  setHousingStockIdsWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdWithStreets[];
  handleOpenDistrictEditer: () => void;
  isAllowedToEditer: boolean;
  cityInFilter: string | undefined;
  isLoading: boolean;
};

import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  FilterType,
  StreetWithPreparedBuildingNumbers,
} from '../../districtBordersByAddressService.types';

export type DistrictBordersByAddressPageProps = {
  selectCity: (city: string) => void;
  addresses: StreetWithPreparedBuildingNumbers[] | null;
  setFilter: (payload: FilterType) => void;
  setHousingStockIdsWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdWithStreets[];
  handleOpenDistrictEditer: () => void;
  isAllowedToEditer: boolean;
  cityInFilter: string | undefined;
};

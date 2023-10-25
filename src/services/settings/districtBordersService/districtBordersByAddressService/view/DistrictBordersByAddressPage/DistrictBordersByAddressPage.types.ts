import {
  CheckedHousingStocksWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  FilterType,
  StreetWithPreparedBuildingNumbers,
} from '../../districtBordersByAddressService.types';

export type DistrictBordersByAddressPageProps = {
  selectCity: (city: string) => void;
  addresses: StreetWithPreparedBuildingNumbers[] | null;
  setFilter: (payload: FilterType) => void;
  setHousingStocksWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
  checkedhousingStocksWithStreet: CheckedHousingStocksWithStreets[];
  handleOpenDistrictEditer: () => void;
  isAllowedToEditer: boolean;
  cityInFilter: string | undefined;
  openShowAddressesModal: () => void;
  checkedAddressesAmount: number;
};

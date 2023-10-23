import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  StreetWithPreparedBuildingNumbers,
} from '../../../districtBordersByAddressService.types';

export type AddressStreetGroupProps = {
  address: StreetWithPreparedBuildingNumbers;
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdWithStreets[];
  setHousingStockIdsWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
};

export type ModifiedAddressShortResponse = {
  number: string[];
  housingStockId: number;
  buildingId: number;
  housingStockNumber: string | null;
  housingStockCorpus: string | null;
  corpus: string | null;
  isDistributed: boolean;
};

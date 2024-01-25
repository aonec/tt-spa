import {
  CheckedHousingStocksWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  StreetWithPreparedBuildingNumbers,
} from '../../../districtBordersByAddressService.types';

export type AddressStreetGroupProps = {
  address: StreetWithPreparedBuildingNumbers;
  checkedhousingStocksWithStreet: CheckedHousingStocksWithStreets[];
  setHousingStocksWithStreet: (
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

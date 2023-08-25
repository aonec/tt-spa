import { StreetWithBuildingNumbersResponse } from 'api/types';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
} from '../../../districtBordersByAddressService.types';

export type AddressStreetGroupProps = {
  address: StreetWithBuildingNumbersResponse;
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
}[];

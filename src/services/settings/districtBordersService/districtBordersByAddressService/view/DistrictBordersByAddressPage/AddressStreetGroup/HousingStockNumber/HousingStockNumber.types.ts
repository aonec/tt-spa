import { AddressShortResponse } from 'myApi';

export type HousingStockNumberProps = {
  housingStock: AddressShortResponse;
  setHousingStockIds: React.Dispatch<React.SetStateAction<number[]>>;
  housingStockIds: number[];
};

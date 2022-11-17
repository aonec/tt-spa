import {
  StreetWithHousingStockNumbersResponse,
  HousingStockResponse,
} from 'myApi';

export type ObjectsMapsProps = {
  streetsData: StreetWithHousingStockNumbersResponse[] | null;
  handleClickHousingStock: (payload: number) => void;
  housingStock: HousingStockResponse | null;
  isLoadingHousingStock: boolean;
  clearHosuingStock: () => void
};

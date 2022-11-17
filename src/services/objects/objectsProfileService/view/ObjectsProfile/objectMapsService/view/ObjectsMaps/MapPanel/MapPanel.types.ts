import {
  HousingStockResponse,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';

export type MapPanelProps = {
  streetsData: StreetWithHousingStockNumbersResponse[] | null;
  handleClickHousingStock: (payload: number) => void;
  housingStock: HousingStockResponse | null;
  isLoadingHousingStock: boolean;
  clearHosuingStock: () => void;
};

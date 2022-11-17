import { HousingStockResponse } from 'myApi';

export type HousingStockProps = {
  housingStock: HousingStockResponse;
  clearHosuingStock: () => void;
};

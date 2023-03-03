import { HousingStockWithTasksResponse } from 'myApi';

export type HousingStockTasksProps = {
  selectedHousingStock: HousingStockWithTasksResponse | null;
  clearSelectedHousingStock: () => void;
};

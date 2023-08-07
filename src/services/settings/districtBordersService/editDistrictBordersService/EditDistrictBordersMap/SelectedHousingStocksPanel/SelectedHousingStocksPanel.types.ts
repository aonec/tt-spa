import { BuildingListResponse } from 'api/types';

export type SelectedHousingStocksProps = {
  housesInDistrict: BuildingListResponse[];
  selectedHousingStocks: number[];
  toggleHousingStock: (id: number) => void;
  handleCancel: () => void;
};

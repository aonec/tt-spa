import { BuildingWithCoordinatesResponse } from 'api/types';

export type SelectedHousingStocksProps = {
  housesInDistrict: BuildingWithCoordinatesResponse[];
  isLoading: boolean;
  selectedHousingStocks: number[];
  toggleHousingStock: (id: number) => void;
  handleCancel: () => void;
  handleUpdate: () => void;
};

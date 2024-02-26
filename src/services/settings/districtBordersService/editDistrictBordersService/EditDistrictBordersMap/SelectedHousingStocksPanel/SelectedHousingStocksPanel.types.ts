import { BuildingWithCoordinatesResponse } from 'api/types';
import { EditindDistrictArrayType } from '../EditDistrictBordersMap.types';

export type SelectedHousingStocksProps = {
  housesInDistrict: BuildingWithCoordinatesResponse[];
  isLoading: boolean;
  selectedHousingStocks: number[];
  toggleHousingStock: (id: number) => void;
  handleCancel: () => void;
  handleUpdate: () => void;
  editindDistrictArray: EditindDistrictArrayType;
};

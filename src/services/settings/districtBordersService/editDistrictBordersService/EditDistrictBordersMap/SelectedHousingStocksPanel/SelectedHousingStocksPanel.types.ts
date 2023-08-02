import { BuildingListResponse } from 'api/types';

export type Props = {
  housesInDistrict: BuildingListResponse[];
  isLoading: boolean;
  selectedHousingStocks: number[];
  toggleHousingStock: (id: number) => void;
  handleCancel: () => void;
  handleUpdate: () => void;
};

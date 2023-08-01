import { BuildingListResponse } from 'api/types';

export type Props = {
  housesInDistrict: BuildingListResponse[];
  selectedHousingStocks: number[];
  toggleHousingStock: (id: number) => void;
  handleCancel: () => void;
};

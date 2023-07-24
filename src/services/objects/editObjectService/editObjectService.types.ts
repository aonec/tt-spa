import { EHouseCategory, HousingStockUpdateRequest } from 'api/types';

export type EditObjectPayload = {
  buildingId: number;
  data: HousingStockUpdateRequest;
  houseCategory: EHouseCategory;
};

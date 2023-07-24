import { EHouseCategory, HousingStockUpdateRequest } from 'myApi';

export type EditObjectPayload = {
  buildingId: number;
  data: HousingStockUpdateRequest;
  houseCategory: EHouseCategory;
};

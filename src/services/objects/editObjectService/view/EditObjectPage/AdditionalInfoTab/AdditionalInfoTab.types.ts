import { EHouseCategory, HousingStockResponse, HousingStockUpdateRequest, NonResidentialBuildingResponse } from 'api/types';

export type AdditionalInfoTabProps = {
  housingStock: HousingStockResponse | null;
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
  onPageCancel: () => void;
  handleUpdateHousingStock: (payload: HousingStockUpdateRequest) => void;
  houseCategory: EHouseCategory;
};

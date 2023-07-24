import {
  EHouseCategory,
  HousingStockResponse,
  HousingStockUpdateRequest,
  NonResidentialBuildingResponse,
} from 'myApi';

export type AdditionalInfoTabProps = {
  housingStock: HousingStockResponse | null;
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
  onPageCancel: () => void;
  handleUpdateHousingStock: (payload: HousingStockUpdateRequest) => void;
  houseCategory: EHouseCategory;
};

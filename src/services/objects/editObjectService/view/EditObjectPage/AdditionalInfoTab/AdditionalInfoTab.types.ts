import { HousingStockResponse, HousingStockUpdateRequest } from 'api/myApi';

export type AdditionalInfoTabProps = {
  housingStock: HousingStockResponse;
  onPageCancel: () => void;
  handleUpdateHousingStock: (payload: HousingStockUpdateRequest) => void;
};

import { HousingStockResponse, HousingStockUpdateRequest } from 'myApi';

export type AdditionalInfoTabProps = {
  housingStock: HousingStockResponse;
  onPageCancel: () => void;
  handleUpdateHousingStock: (payload: HousingStockUpdateRequest) => void;
};

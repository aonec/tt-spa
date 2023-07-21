import { HousingStockResponse, HousingStockUpdateRequest } from 'api/types';

export type AdditionalInfoTabProps = {
  housingStock: HousingStockResponse;
  onPageCancel: () => void;
  handleUpdateHousingStock: (payload: HousingStockUpdateRequest) => void;
};

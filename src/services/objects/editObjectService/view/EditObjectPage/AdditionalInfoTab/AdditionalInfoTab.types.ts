import { HousingStockResponse } from 'myApi';

export type AdditionalInfoTabProps = {
  housingStock: HousingStockResponse;
  onPageCancel: () => void
};

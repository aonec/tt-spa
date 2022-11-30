import { HousingStockResponse } from 'myApi';

export type CreateNodePageProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  isLoadingHousingStock: boolean;
  existingStreets: string[];
};

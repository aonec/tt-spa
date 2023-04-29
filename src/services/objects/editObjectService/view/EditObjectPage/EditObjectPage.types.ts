import { HousingStockResponse } from 'myApi';

export type EditObjectPageProps = {
  housingStock: HousingStockResponse;
  existingCities: string[] | null;
  existingStreets: string[];
};

export enum EditObjectPageTabs {
  Address = 'Address',
  MainInfo = 'MainInfo',
  AdditionalInfo = 'AdditionalInfo',
}

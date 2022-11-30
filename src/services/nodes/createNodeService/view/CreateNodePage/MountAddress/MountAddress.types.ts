import { HousingStockResponse } from 'myApi';

export type MountAddressProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  existingStreets: string[];
  handleSubmit: (housingStockId: number) => void;
};

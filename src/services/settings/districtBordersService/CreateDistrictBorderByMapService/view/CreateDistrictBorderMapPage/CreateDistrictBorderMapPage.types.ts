import { HousingStockListResponse } from 'myApi';

export type CreateDistrictBorderMapPageProps = {
  isLoadingHousingStocks: boolean;
  housingStocksList: HousingStockListResponse[];
};

export const ymaps = window.ymaps;

export enum DistrictColor {
  Blue = 'blue',
  Violet = 'violete',
  Yellow = 'yellow',
  Red = 'red',
  Green = 'green',
}

export type DistrictColorData = {
  type: DistrictColor;
  name: string;
  color: string;
  strokeColor: string;
};

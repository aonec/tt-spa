import { HousingStockListResponse } from 'myApi';

export type CreateDistrictBorderMapPageProps = {
  isLoadingHousingStocks: boolean;
  housingStocksList: HousingStockListResponse[];
  selectedByAddressHousingStockIds: number[];
  selectedByAddressPoligon: number[][];
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

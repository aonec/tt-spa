import { HousingStockListResponse } from 'myApi';
import { Coordinate } from 'services/settings/districtBordersService/districtBordersByAddressService/districtBordersByAddressService.utils';

export type CreateDistrictBorderMapPageProps = {
  isLoadingHousingStocks: boolean;
  housingStocksList: HousingStockListResponse[];
  selectedByAddressHousingStockIds: number[];
  selectedByAddressPoligon: number[][];
  poligonCenter: [number, number];
  handleCloseDistrictEditer: () => void;
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

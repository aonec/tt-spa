import { DistrictCreateRequest, HousingStockListResponse } from 'myApi-test';
import { DistrictColor } from '../CreateDistrictBorderMapPage.types';

export type CreateDistrictFormPanelProps = {
  isLoadingHousingStocks: boolean;
  housingStocksInDistrict: HousingStockListResponse[];
  selectedHousingStocks: number[];
  handleClickHousingStock: (id: number) => void;
  handleCancel: () => void;
  setDistrictColor: (color: DistrictColor) => void;
  districtColor: DistrictColor;
  formSection: number;
  setFormSection: (section: number) => void;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
  isLoadingCreatingDistrict: boolean;
  districtName: string;
  setDistrictName: (value: string) => void;
  districtPolygonCoordinates: number[][];
};

export type DistrictAdditionalInfo = {
  districtPolygonCoordinates: number[][];
  districtColor: DistrictColor;
};

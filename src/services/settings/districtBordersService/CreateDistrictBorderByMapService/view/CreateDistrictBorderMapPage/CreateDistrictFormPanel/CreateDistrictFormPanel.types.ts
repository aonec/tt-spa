import { HousingStockListResponse } from 'myApi';
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
};

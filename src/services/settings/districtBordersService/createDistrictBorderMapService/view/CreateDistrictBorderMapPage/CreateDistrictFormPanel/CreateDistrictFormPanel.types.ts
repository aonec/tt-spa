import {
  BuildingWithCoordinatesResponse,
  DistrictCreateRequest,
} from 'api/types';
import { DistrictColor } from 'types';

export type CreateDistrictFormPanelProps = {
  isLoadingHousingStocks: boolean;
  housingStocksInDistrict: BuildingWithCoordinatesResponse[];
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

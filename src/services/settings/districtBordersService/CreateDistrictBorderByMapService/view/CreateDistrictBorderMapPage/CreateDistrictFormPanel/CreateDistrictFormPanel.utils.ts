import { DistrictCreateRequest } from 'myApi-test';
import { DistrictColor } from '../CreateDistrictBorderMapPage.types';
import { DistrictAdditionalInfo } from './CreateDistrictFormPanel.types';

export const combinePayloadForCreateDistrict = (
  districtName: string,
  selectedHousingStocks: number[],
  districtPolygonCoordinates: number[][],
  districtColor: DistrictColor,
): DistrictCreateRequest => {
  const additialInfo: DistrictAdditionalInfo = {
    districtColor,
    districtPolygonCoordinates,
  };

  return {
    title: districtName,
    houseIds: selectedHousingStocks,
    additionalInfo: JSON.stringify(additialInfo),
  };
};

import { DistrictCreateRequest, DistrictResponse } from 'myApi';
import { DistrictAdditionalInfo, DistrictColor } from 'types';

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

export const getPayloadFromDistrict = (district: DistrictResponse) => {
  const additionalInfo = JSON.parse(
    district.additionalInfo as string,
  ) as unknown as DistrictAdditionalInfo;

  return {
    id: district.id,
    name: district.title || 'unknown',
    type: additionalInfo.districtColor,
    coordinates: [additionalInfo.districtPolygonCoordinates],
  };
};

export const getPayloadFromDistricts = (districtsList: DistrictResponse[]) => {
  return districtsList.map(getPayloadFromDistrict);
};

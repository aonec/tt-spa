import { DistrictCreateRequest, DistrictResponse } from 'api/types';
import { DistrictAdditionalInfo, DistrictColor, DistrictData } from 'types';

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

export const getPayloadFromDistrict = (
  district: DistrictResponse,
  isEditing?: boolean,
): DistrictData | null => {
  try {
    const additionalInfo = JSON.parse(
      district.additionalInfo as string,
    ) as unknown as DistrictAdditionalInfo;

    return {
      id: district.id,
      name: district.title || 'unknown',
      type: additionalInfo.districtColor,
      coordinates: [additionalInfo.districtPolygonCoordinates || []],
      isEditing,
      houses: district.houses || [],
    };
  } catch (e) {
    return null;
  }
};

export const getDistrictJsonData = (data: DistrictAdditionalInfo) => {
  return JSON.stringify(data);
};

export const getPayloadFromDistricts = (districtsList: DistrictResponse[]) => {
  return districtsList
    .map((elem) => getPayloadFromDistrict(elem))
    .filter(Boolean) as DistrictData[];
};

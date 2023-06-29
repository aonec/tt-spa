import { HousingStockListResponsePagedList } from 'myApi';
import { DistrictColor, DistrictData } from 'types';
import housingStockMiniPlacemark from 'hooks/ymaps/placemarks/housingStockMiniPlacemark.svg';
import housingStockPlacemark from 'hooks/ymaps/placemarks/housingStockPlacemark.svg';
import { isPointInsidePolygon } from 'utils/isPointInsidePolygon';

export const getBuildingPlacmearks = (
  housingStocks: HousingStockListResponsePagedList | null,
  selectedHouses: number[],
) => {
  if (!housingStocks?.items) return [];

  return housingStocks.items.map((elem) => {
    const isHouseInsideDistrict = selectedHouses.includes(elem.id);

    return {
      placemarkIconLink: isHouseInsideDistrict
        ? housingStockPlacemark
        : housingStockMiniPlacemark,
      coords: [
        elem.coordinates?.latitude || 0,
        elem.coordinates?.longitude || 0,
      ],
      size: isHouseInsideDistrict ? [51, 51] : [24, 24],
    };
  });
};

export const getSelectedHouseIds = (
  workingDistrict: ymaps.Polygon | null,
  existingHousingStocks: HousingStockListResponsePagedList | null,
) => {
  const coordinates = workingDistrict?.geometry?.getCoordinates();

  const selectedHouseIds = existingHousingStocks?.items
    ?.filter((elem) => {
      return (
        coordinates &&
        isPointInsidePolygon(
          [elem.coordinates?.latitude || 0, elem.coordinates?.longitude || 0],
          coordinates[0],
        )
      );
    })
    .map((elem) => elem.id);

  return selectedHouseIds || [];
};

export const getWorkingDistrict = (isEditing: boolean) => {
  const district: DistrictData = {
    coordinates: [],
    id: 'working-district',
    type: DistrictColor.Blue,
    name: '',
    isEditing,
  };

  return [district];
};

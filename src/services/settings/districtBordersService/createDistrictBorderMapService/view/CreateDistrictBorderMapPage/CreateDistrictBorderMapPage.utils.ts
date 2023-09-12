import { BuildingListResponsePagedList, HousingStockResponse } from 'api/types';
import { DistrictColor, DistrictData } from 'types';
import housingStockMiniPlacemark from 'hooks/ymaps/placemarks/housingStockMiniPlacemark.svg';
import housingStockPlacemark from 'hooks/ymaps/placemarks/housingStockPlacemark.svg';
import inactiveHousingStockPlacemark from 'hooks/ymaps/placemarks/inactiveHousingStockPlacemark.svg';
import { isPointInsidePolygon } from 'utils/isPointInsidePolygon';

export const getBuildingPlacmearks = (
  housingStocks: BuildingListResponsePagedList | null,
  housesInDistrict: number[],
  selectedHouses: number[],
  toggleHouse: (id: number) => void,
  renderTasksCount?: boolean,
) => {
  if (!housingStocks?.items) return [];

  return housingStocks.items.map((elem) => {
    const isHouseInsideDistrict = housesInDistrict.includes(elem.id);
    const isHouseSelected = selectedHouses.includes(elem.id);

    return {
      placemarkIconLink: isHouseInsideDistrict
        ? isHouseSelected
          ? housingStockPlacemark
          : inactiveHousingStockPlacemark
        : housingStockMiniPlacemark,
      coords: [
        elem.coordinates?.latitude || 0,
        elem.coordinates?.longitude || 0,
      ] as [number, number],
      count: renderTasksCount ? elem.numberOfTasks || undefined : undefined,
      onClick: () => toggleHouse(elem.id),
      size: isHouseInsideDistrict ? [51, 51] : [24, 24],
    };
  });
};

export const getHousesPlacmearks = (
  housingStocks: HousingStockResponse[] | null,
  housesInDistrict: number[],
  selectedHouses: number[],
  toggleHouse: (id: number) => void,
  renderTasksCount?: boolean,
) => {
  if (!housingStocks) return [];

  return housingStocks.map((elem) => {
    const isHouseInsideDistrict = housesInDistrict.includes(elem.id);
    const isHouseSelected = selectedHouses.includes(elem.id);

    return {
      placemarkIconLink: isHouseInsideDistrict
        ? isHouseSelected
          ? housingStockPlacemark
          : inactiveHousingStockPlacemark
        : housingStockMiniPlacemark,
      coords: [
        elem.coordinates?.latitude || 0,
        elem.coordinates?.longitude || 0,
      ] as [number, number],
      count: renderTasksCount ? elem.numberOfTasks || undefined : undefined,
      onClick: () => toggleHouse(elem.id),
      size: isHouseInsideDistrict ? [51, 51] : [24, 24],
    };
  });
};

export const getSelectedHouses = (
  workingDistrict: ymaps.Polygon | null,
  existingHousingStocks: BuildingListResponsePagedList | null,
) => {
  const coordinates = workingDistrict?.geometry?.getCoordinates();

  const selectedHouseIds = existingHousingStocks?.items?.filter((elem) => {
    return (
      coordinates &&
      isPointInsidePolygon(
        [elem.coordinates?.latitude || 0, elem.coordinates?.longitude || 0],
        coordinates[0],
      )
    );
  });

  return selectedHouseIds || [];
};

export const getWorkingDistrict = (
  isDrawing: boolean,
  name: string,
  color: DistrictColor,
) => {
  const district: DistrictData = {
    coordinates: [],
    id: 'working-district',
    type: color,
    name,
    isDrawing,
  };

  return [district];
};

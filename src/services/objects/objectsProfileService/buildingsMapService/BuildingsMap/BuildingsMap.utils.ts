import { BuildingListResponsePagedList } from 'api/types';
import housingStockMiniPlacemark from 'hooks/ymaps/placemarks/housingStockMiniPlacemark.svg';
import housingStockPlacemark from 'hooks/ymaps/placemarks/housingStockPlacemark.svg';
import inactiveHousingStockPlacemark from 'hooks/ymaps/placemarks/inactiveHousingStockPlacemark.svg';

export const getBuildingPlacmearksWithTasks = (
  housingStocks: BuildingListResponsePagedList | null,
  housesInDistrict: number[],
  selectedHouses: number[],
  toggleHouse: (id: number) => void,
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
      count: elem.numberOfTasks || undefined,
      onClick: () => toggleHouse(elem.id),
      size: isHouseInsideDistrict ? [51, 51] : [24, 24],
    };
  });
};

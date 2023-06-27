import { HousingStockListResponsePagedList } from 'myApi';
import housingStockMiniPlacemark from 'hooks/ymaps/placemarks/housingStockMiniPlacemark.svg';

export const getBuildingPlacmearks = (
  housingStocks: HousingStockListResponsePagedList | null,
) => {
  if (!housingStocks?.items) return [];

  return housingStocks.items.map((elem) => ({
    placemarkIconLink: housingStockMiniPlacemark,
    coords: [elem.coordinates?.latitude || 0, elem.coordinates?.longitude || 0],
    size: [24, 24],
  }));
};

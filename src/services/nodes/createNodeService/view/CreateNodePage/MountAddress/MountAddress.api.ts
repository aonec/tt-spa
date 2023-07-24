import { getBuildings } from 'services/objects/displayObjectsListService/displayObjectsListService.api';
import { GetHousingStocksRequestPayload } from 'services/objects/displayObjectsListService/displayObjectsListService.types';

export const getBuilding = async (values: GetHousingStocksRequestPayload) => {
  const buildings = await getBuildings(values);

  const building = buildings.items?.[0];

  return building || null;
};

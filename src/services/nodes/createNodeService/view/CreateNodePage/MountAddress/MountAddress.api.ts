import { GetHousingStocksRequestPayload } from 'services/objects/displayObjectsListService/displayObjectsListService.types';
import { axios } from 'api/axios';
import { BuildingListResponsePagedList } from 'api/types';

export const getBuilding = async (params: GetHousingStocksRequestPayload) => {
  const buildings: BuildingListResponsePagedList = await axios.get(
    'Buildings',
    { params },
  );

  const building = buildings.items?.[0];

  return building || null;
};

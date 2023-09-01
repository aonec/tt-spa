import { axios } from 'api/axios';
import { GetBuildingFilters } from './addHouseToDistrictService.types';
import { BuildingListResponsePagedList, HousingStockResponse } from 'api/types';

export const getBuildings = (
  params: GetBuildingFilters,
): Promise<BuildingListResponsePagedList> => axios.get('Buildings', { params });

export const getBuilding = async (params: GetBuildingFilters) => {
  const houses: BuildingListResponsePagedList | null = await getBuildings(
    params,
  );

  if (!houses?.items?.length) return null;

  const house = houses.items[0];

  const houseResponse: HousingStockResponse = await axios.get(
    `HousingStocks/${house.id}`,
  );

  return houseResponse;
};

import { axios } from 'api/axios';
import {
  AddHouseToDistrictRequestPayload,
  GetBuildingFilters,
} from './addHouseToDistrictService.types';
import {
  BuildingWithCoordinatesResponsePagedList,
  HousingStockResponse,
} from 'api/types';
import { createMutation } from '@farfetched/core';
import { EffectFailDataAxiosError } from 'types';
import { createEffect } from 'effector';

const getBuildings = (
  params: GetBuildingFilters,
): Promise<BuildingWithCoordinatesResponsePagedList> =>
  axios.get('Buildings/Lite', { params });

export const getBuilding = async (params: GetBuildingFilters) => {
  const houses: BuildingWithCoordinatesResponsePagedList | null =
    await getBuildings(params);

  if (!houses?.items?.length) return null;

  const house = houses.items[0];

  const houseResponse: HousingStockResponse = await axios.get(
    `HousingStocks/${house.id}`,
  );

  return houseResponse;
};

export const addHouseToDistrictMutation = createMutation({
  effect: createEffect<
    AddHouseToDistrictRequestPayload,
    void,
    EffectFailDataAxiosError
  >((params) =>
    axios.post(
      `/IndividualSeal/Districts/${params.districtId}/AddHouse`,
      params.data,
      { headers: { 'Content-Type': `application/json` } },
    ),
  ),
});

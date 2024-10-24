import { createQuery } from '@farfetched/core';
import axios from 'api/axios';
import {
  BuildingWithCoordinatesResponsePagedList,
  DistrictResponse,
} from 'api/types';
import { createMutation } from '@farfetched/core';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import {
  AddHouseToDistrictRequestPayload,
  DeleteHouseInDistrictRequestPayload,
} from './editDistrictBordersService.types';

export const existingHousingStocksQuery = createQuery<
  [],
  BuildingWithCoordinatesResponsePagedList
>({
  handler: () => axios.get('Buildings/Lite'),
});

export const existingDistrictsQuery = createQuery<
  [],
  DistrictResponse[] | null
>({
  handler: async () => {
    const districts: DistrictResponse[] = await axios.get(
      'IndividualSeal/Districts',
    );

    if (!districts) return null;

    return districts.reverse();
  },
});

export const deleteHouseInDistrictMutation = createMutation({
  effect: createEffect<
    DeleteHouseInDistrictRequestPayload,
    void,
    EffectFailDataAxiosError
  >((params) =>
    axios.post(
      `/IndividualSeal/Districts/${params.districtId}/DeleteHouse`,
      params.buildingId,
      { headers: { 'Content-Type': `application/json` } },
    ),
  ),
});

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

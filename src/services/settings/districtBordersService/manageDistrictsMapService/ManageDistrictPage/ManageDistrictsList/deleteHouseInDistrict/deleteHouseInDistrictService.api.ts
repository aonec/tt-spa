import { axios } from 'api/axios';
import { createMutation } from '@farfetched/core';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import { DeleteHouseInDistrictRequestPayload } from './deleteHouseInDistrictService.types';

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

import { createEffect, createStore } from 'effector';
import { forward } from 'effector';
import { createGate } from 'effector-react';
import { HouseManagementResponse } from 'api/types';
import { getHouseManagements } from './houseManagementsService.api';
import { GetHouseManagementsRequestPayload } from './houseManagementsService.types';

const HouseManagementsGate = createGate<GetHouseManagementsRequestPayload>();

const fetchHouseManagementFx = createEffect<
  GetHouseManagementsRequestPayload,
  HouseManagementResponse[]
>(getHouseManagements);

const $houseManagements = createStore<HouseManagementResponse[] | null>(
  null,
).on(fetchHouseManagementFx.doneData, (_, list) => list);

forward({
  from: HouseManagementsGate.state,
  to: fetchHouseManagementFx,
});

export const houseManagementsService = {
  outputs: {
    $houseManagements,
  },
  gates: {
    HouseManagementsGate,
  },
};

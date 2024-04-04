import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
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

sample({
  source: $houseManagements,
  clock: HouseManagementsGate.state,
  filter: (houseManagements) => !houseManagements,
  fn: (_, payload) => payload,
  target: fetchHouseManagementFx,
});

export const houseManagementsService = {
  outputs: {
    $houseManagements,
  },
  gates: {
    HouseManagementsGate,
  },
};

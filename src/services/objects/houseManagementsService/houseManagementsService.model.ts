import { createDomain, sample, guard } from 'effector';
import { createGate } from 'effector-react';
import { HouseManagementResponse } from 'myApi';
import { getHouseManagements } from './houseManagementsService.api';
import { GetHouseManagementsRequestPayload } from './houseManagementsService.types';

const domain = createDomain('houseManagementsService');

const HouseManagementsGate = createGate<GetHouseManagementsRequestPayload>();

const fetchHouseManagementFx = domain.createEffect<
  GetHouseManagementsRequestPayload,
  HouseManagementResponse[]
>(getHouseManagements);

const $houseManagements = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementFx.doneData, (_, list) => list)

sample({
  source: HouseManagementsGate.state,
  clock: guard({
    source: $houseManagements,
    clock: HouseManagementsGate.state,
    filter: (houseManagements) => !houseManagements,
  }),
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

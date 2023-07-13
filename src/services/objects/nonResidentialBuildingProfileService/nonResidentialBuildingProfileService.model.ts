import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { getNonResidentialBuildingQuery } from './nonResidentialBuildingProfileService.api';
import { NonResidentialBuildingProfileGrouptype } from './nonResidentialBuildingProfileService.constants';

const domain = createDomain('nonResidentialBuildingProfileService');

const BuildingIdGate = createGate<{ buildingId: number }>();

const resetGrouptype = domain.createEvent();
const setCurrentGroutype =
  domain.createEvent<NonResidentialBuildingProfileGrouptype>();

const $currentGrouptype = domain
  .createStore<NonResidentialBuildingProfileGrouptype>(
    NonResidentialBuildingProfileGrouptype.Common,
  )
  .on(setCurrentGroutype, (_, grouptype) => grouptype)
  .reset(resetGrouptype);

sample({
  clock: BuildingIdGate.open.map(({ buildingId }) => buildingId),
  target: getNonResidentialBuildingQuery.start,
});

sample({
  clock: BuildingIdGate.close,
  target: [getNonResidentialBuildingQuery.reset, resetGrouptype],
});

export const nonResidentialBuildingProfileService = {
  inputs: {
    setCurrentGroutype,
  },
  outputs: {
    $currentGrouptype,
  },
  gates: { BuildingIdGate },
};

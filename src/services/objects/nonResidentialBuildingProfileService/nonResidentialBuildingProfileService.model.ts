import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { nonResidentialBuildingQuery } from './nonResidentialBuildingProfileService.api';
import { NonResidentialBuildingProfileGrouptype } from './nonResidentialBuildingProfileService.constants';
import { consolidatedReportService } from '../housingStockProfileService/consolidatedReportService';

const domain = createDomain('nonResidentialBuildingProfileService');

const BuildingIdGate = createGate<{ buildingId: number }>();

const resetGroupType = domain.createEvent();
const setCurrentGroutype =
  domain.createEvent<NonResidentialBuildingProfileGrouptype>();

const $currentGrouptype = domain
  .createStore<NonResidentialBuildingProfileGrouptype>(
    NonResidentialBuildingProfileGrouptype.Common,
  )
  .on(setCurrentGroutype, (_, grouptype) => grouptype)
  .reset(resetGroupType);

sample({
  clock: BuildingIdGate.open.map(({ buildingId }) => buildingId),
  target: nonResidentialBuildingQuery.start,
});

sample({
  clock: BuildingIdGate.close,
  target: [nonResidentialBuildingQuery.reset, resetGroupType],
});

export const nonResidentialBuildingProfileService = {
  inputs: {
    setCurrentGroutype,
    openConsolidatedReportModal:
      consolidatedReportService.inputs.openConsolidatedReportModal,
  },
  outputs: {
    $currentGrouptype,
  },
  gates: { BuildingIdGate },
};

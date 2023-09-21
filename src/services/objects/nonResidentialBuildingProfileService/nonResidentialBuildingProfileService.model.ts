import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  nonResidentialBuildingQuery,
  resourceDisconnectionQuery,
} from './nonResidentialBuildingProfileService.api';
import { consolidatedReportService } from '../housingStockProfileService/consolidatedReportService';

const BuildingIdGate = createGate<{ buildingId: number }>();

sample({
  clock: BuildingIdGate.open.map(({ buildingId }) => buildingId),
  target: [nonResidentialBuildingQuery.start, resourceDisconnectionQuery.start],
});

sample({
  clock: BuildingIdGate.close,
  target: [nonResidentialBuildingQuery.reset, resourceDisconnectionQuery.reset],
});

export const nonResidentialBuildingProfileService = {
  inputs: {
    openConsolidatedReportModal:
      consolidatedReportService.inputs.openConsolidatedReportModal,
  },
  gates: { BuildingIdGate },
};

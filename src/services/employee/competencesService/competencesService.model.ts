import { createEffect, createStore } from 'effector';
import { forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { ManagementFirmCompetenceResponse } from 'api/types';
import { getCompetencesCatalog } from './competencesService.api';

const CompetencesGate = createGate();

const fetchCompetencesFx = createEffect<
  void,
  ManagementFirmCompetenceResponse[] | null
>(getCompetencesCatalog);

const $competencesCatalog = createStore<
  ManagementFirmCompetenceResponse[] | null
>(null).on(fetchCompetencesFx.doneData, (_, competences) => competences);

forward({
  from: guard({
    clock: CompetencesGate.open,
    source: $competencesCatalog,
    filter: (competences) => competences === null,
  }),
  to: fetchCompetencesFx,
});

export const competencesService = {
  inputs: {},
  outputs: { $competencesCatalog },
  gates: { CompetencesGate },
};

import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
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

sample({
  clock: sample({
    clock: CompetencesGate.open,
    source: $competencesCatalog,
    filter: (competences) => competences === null,
  }),
  target: fetchCompetencesFx,
});

export const competencesService = {
  inputs: {},
  outputs: { $competencesCatalog },
  gates: { CompetencesGate },
};

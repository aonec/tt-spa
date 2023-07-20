import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { ManagementFirmCompetenceResponse } from 'api/types';
import { getCompetencesCatalog } from './competencesService.api';

const domain = createDomain('competencesService');

const CompetencesGate = createGate();

const fetchCompetencesFx = domain.createEffect<
  void,
  ManagementFirmCompetenceResponse[] | null
>(getCompetencesCatalog);

const $competencesCatalog = domain
  .createStore<ManagementFirmCompetenceResponse[] | null>(null)
  .on(fetchCompetencesFx.doneData, (_, competences) => competences);

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

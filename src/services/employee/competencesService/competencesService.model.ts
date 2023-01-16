import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { ManagementFirmCompetenceResponse } from 'myApi';
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

const $isFetchingCompetencesFailed = domain
  .createStore(false)
  .on(fetchCompetencesFx.failData, () => true)
  .reset(fetchCompetencesFx.doneData);

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

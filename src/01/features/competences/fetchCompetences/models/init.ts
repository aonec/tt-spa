import { getCompetencesCatalog } from './../../../../_api/competences';
import { forward, guard } from 'effector';
import {
  $competencesCatalog,
  $isFetchingCompetencesFailed,
  CompetencesGate,
  fetchCompetencesFx,
} from './index';

fetchCompetencesFx.use(getCompetencesCatalog);

$isFetchingCompetencesFailed
  .on(fetchCompetencesFx.failData, () => true)
  .reset(fetchCompetencesFx.doneData);

$competencesCatalog.on(
  fetchCompetencesFx.doneData,
  (_, competences) => competences
);

forward({
  from: guard({
    clock: CompetencesGate.open,
    source: $competencesCatalog,
    filter: (competences) => competences === null,
  }),
  to: fetchCompetencesFx,
});

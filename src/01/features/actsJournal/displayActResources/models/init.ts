import { guard } from 'effector';
import { $actResources, ActResourcesGate, fetchResourcesFx } from '.';
import { getActResources } from '../../../../_api/apartmentActs';

fetchResourcesFx.use(getActResources);

$actResources.on(fetchResourcesFx.doneData, (_, types) => types);

guard({
  clock: ActResourcesGate.open,
  source: $actResources,
  filter: (types) => !types?.length,
  target: fetchResourcesFx,
});

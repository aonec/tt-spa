import { getActResources } from '01/_api/apartmentActs';
import { guard } from 'effector';
import { $actResources, ActResourcesGate, fetchResourcesFx } from '.';

fetchResourcesFx.use(getActResources);

$actResources.on(fetchResourcesFx.doneData, (_, types) => types);

guard({
  clock: ActResourcesGate.open,
  source: $actResources,
  filter: (types) => !types?.length,
  target: fetchResourcesFx,
});

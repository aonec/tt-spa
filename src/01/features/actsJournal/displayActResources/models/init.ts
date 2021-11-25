import { getActResources } from '01/_api/apartmentActs';
import { guard } from 'effector';
import { $resources, ActResourcesGate, fetchResourcesFx } from '.';

fetchResourcesFx.use(getActResources);

$resources.on(fetchResourcesFx.doneData, (_, types) => types);

guard({
  clock: ActResourcesGate.open,
  source: $resources,
  filter: (types) => !types?.length,
  target: fetchResourcesFx,
});

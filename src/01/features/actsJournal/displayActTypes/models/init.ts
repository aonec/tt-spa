import { getApartmentActTypes } from '01/_api/apartmentActs';
import { guard } from 'effector';
import { $actTypes, ApartmentActTypesGate, fetchActTypesFx } from '.';

fetchActTypesFx.use(getApartmentActTypes);

$actTypes.on(fetchActTypesFx.doneData, (_, types) => types);

guard({
  clock: ApartmentActTypesGate.open,
  source: $actTypes,
  filter: (types) => !types?.length,
  target: fetchActTypesFx,
});

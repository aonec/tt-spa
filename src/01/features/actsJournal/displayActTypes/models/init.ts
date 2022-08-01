import { guard } from 'effector';
import { $actTypes, ApartmentActTypesGate, fetchActTypesFx } from '.';
import { getApartmentActTypes } from '../../../../_api/apartmentActs';

fetchActTypesFx.use(getApartmentActTypes);

$actTypes.on(fetchActTypesFx.doneData, (_, types) => types);

guard({
  clock: ApartmentActTypesGate.open,
  source: $actTypes,
  filter: (types) => !types?.length,
  target: fetchActTypesFx,
});

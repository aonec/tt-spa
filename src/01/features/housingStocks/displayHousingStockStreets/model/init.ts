import { forward, guard } from 'effector';
import { $existingStreets, ExistingStreetsGate, fetchExistingStreets } from '.';

$existingStreets.on(fetchExistingStreets.doneData, (_, payload) => payload);

forward({
  from: guard({
    clock: ExistingStreetsGate.state,
    source: ExistingStreetsGate.state.map((values) => values),
    filter: (values) => Boolean(values.Street),
  }),
  to: fetchExistingStreets,
});

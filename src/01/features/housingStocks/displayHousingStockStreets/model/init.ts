import { getExistingStreets } from '01/_api/existingStreets';
import { forward, guard, sample } from 'effector';
import { $existingStreets, ExistingStreetsGate, fetchExistingStreets } from '.';

fetchExistingStreets.use(getExistingStreets);

$existingStreets.on(fetchExistingStreets.doneData, (_, payload) => payload);

sample({
  clock: guard({
    clock: ExistingStreetsGate.state.map((values) => values),
    filter: (payload) => Boolean(payload.City),
  }),
  target: fetchExistingStreets,
});

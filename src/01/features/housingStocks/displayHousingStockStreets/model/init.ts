import { getExistingStreets } from '01/_api/existingStreets';
import { guard, sample } from 'effector';
import { $existingStreets, ExistingStreetsGate, fetchExistingStreets } from '.';

fetchExistingStreets.use(getExistingStreets);

$existingStreets.on(fetchExistingStreets.doneData, (_, payload) => payload);

sample({
  source: guard({
    source: $existingStreets,
    filter: (streets) => !Boolean(streets.length),
  }),
  clock: ExistingStreetsGate.state.map((values) => values),
  fn: (_, params) => {
    return params;
  },
  target: fetchExistingStreets,
});

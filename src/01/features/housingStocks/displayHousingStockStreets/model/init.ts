import { getExistingStreets } from '01/_api/existingStreets';
import { forward } from 'effector';
import { $existingStreets, ExistingStreetsGate, fetchExistingStreets } from '.';

fetchExistingStreets.use(getExistingStreets);

$existingStreets.on(fetchExistingStreets.doneData, (_, payload) => payload);

forward({
  from: ExistingStreetsGate.state.map((values) => values),
  to: fetchExistingStreets,
});

import { forward } from 'effector';
import { $existingStreets, ExistingStreetsGate, fetchExistingStreets } from '.';
import { getExistingStreets } from '../../../../_api/existingStreets';

fetchExistingStreets.use(getExistingStreets);

$existingStreets.on(fetchExistingStreets.doneData, (_, payload) => payload);

forward({
  from: ExistingStreetsGate.state.map((values) => values),
  to: fetchExistingStreets,
});

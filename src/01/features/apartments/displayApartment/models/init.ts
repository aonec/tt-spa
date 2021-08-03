import { getApartment } from './../../../../_api/apartments';
import { ApartmentGate } from './index';
import { sample, guard, combine } from 'effector';
import { $apartment, fetchApartmentFx } from '.';

$apartment.on(fetchApartmentFx.doneData, (_, apartment) => apartment);

fetchApartmentFx.use(getApartment);

sample({
  source: ApartmentGate.state.map((state) => state.id),
  clock: guard({
    source: combine(
      $apartment,
      ApartmentGate.state.map((state) => state.id),
      (house, id) => ({ house, id })
    ),
    clock: ApartmentGate.open,
    filter: ({ house, id }) => house?.id !== id,
  }),
  target: fetchApartmentFx,
});

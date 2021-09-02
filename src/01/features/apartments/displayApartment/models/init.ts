import { getApartment } from './../../../../_api/apartments';
import { ApartmentGate, refetchApartment } from './index';
import { combine, guard, sample } from 'effector';
import { $apartment, fetchApartmentFx } from '.';

$apartment.on(fetchApartmentFx.doneData, (_, apartment) => {
  return apartment;
});

fetchApartmentFx.use(getApartment);

sample({
  source: ApartmentGate.state.map((state) => state.id),
  clock: [
    guard({
      source: combine(
        ApartmentGate.state,
        $apartment,
        (gateState, apartment) => apartment?.id !== gateState.id
      ),
      clock: ApartmentGate.open,
      filter: (value) => value,
    }),
    refetchApartment,
  ],
  target: fetchApartmentFx,
});

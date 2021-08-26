import { getApartment } from './../../../../_api/apartments';
import { ApartmentGate, refetchApartment } from './index';
import { sample } from 'effector';
import { $apartment, fetchApartmentFx } from '.';

$apartment.on(fetchApartmentFx.doneData, (_, apartment) => {
  return apartment;
});

fetchApartmentFx.use(getApartment);

sample({
  source: ApartmentGate.state.map((state) => state.id),
  clock: [ApartmentGate.open, refetchApartment],
  target: fetchApartmentFx,
});

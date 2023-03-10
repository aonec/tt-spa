import { getApartment } from './../../../../_api/apartments';
import {
  $apartmentEditMode,
  ApartmentEditModeGate,
  ApartmentGate,
  resetApartment,
  switchApartmentEditMode,
} from './index';
import { sample, forward } from 'effector';
import { $apartment, fetchApartmentFx } from '.';

$apartment
  .on(fetchApartmentFx.doneData, (_, apartment) => {
    return apartment;
  })
  .reset(resetApartment);

fetchApartmentFx.use(getApartment);

sample({
  clock: ApartmentGate.state,
  source: ApartmentGate.state.map((state) => state.id),
  target: fetchApartmentFx,
});

$apartmentEditMode
  .on(switchApartmentEditMode, (mode) => !mode)
  .reset(ApartmentEditModeGate.close);

forward({
  from: ApartmentGate.close,
  to: resetApartment,
});

import { ApartmentGate } from './../../displayApartment/models/index';
import {
  pauseApartmentForm,
  pauseApartmentModalCancelButtonClicked,
  pauseApartmentStatusFx,
} from './index';
import { $isPauseApartmentModalVisible, pauseApartmentButtonClicked } from '.';
import { setApartmentStatus } from '01/_api/apartments';
import { sample, combine, forward } from 'effector';

pauseApartmentStatusFx.use(setApartmentStatus);

$isPauseApartmentModalVisible
  .on(pauseApartmentButtonClicked, () => true)
  .reset(pauseApartmentModalCancelButtonClicked, pauseApartmentStatusFx.done);

forward({
  from: pauseApartmentStatusFx.doneData,
  to: pauseApartmentForm.reset,
});

sample({
  source: combine(
    ApartmentGate.state as any,
    pauseApartmentForm.$values,
    ({ id: apartmentId }: { id: number }, values: any) => ({
      apartmentId,
      requestPayload: { fromDate: values.fromDate, toDate: values.toDate },
    })
  ),
  clock: pauseApartmentForm.formValidated,
  target: pauseApartmentStatusFx as any,
});

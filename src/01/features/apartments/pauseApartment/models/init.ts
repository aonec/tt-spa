import { ApartmentGate } from './../../displayApartment/models/index';
import {
  pauseApartmentForm,
  pauseApartmentModalCancelButtonClicked,
  pauseApartmentStatusFx,
} from './index';
import { $isPauseApartmentModalVisible, pauseApartmentButtonClicked } from '.';
import { setApartmentStatus } from '01/_api/apartments';
import { sample, combine } from 'effector';

pauseApartmentStatusFx.use(setApartmentStatus);

$isPauseApartmentModalVisible
  .on(pauseApartmentButtonClicked, () => true)
  .reset(pauseApartmentModalCancelButtonClicked, pauseApartmentStatusFx.done);

sample({
  source: combine(
    ApartmentGate.open.map((props) => props.id) as any,
    pauseApartmentForm.$values,
    (apartmentId: number, values: any) => ({
      apartmentId,
      requestPayload: { fromDate: values.fromDate, toDate: values.toDate },
    })
  ),
  clock: pauseApartmentForm.formValidated,
  target: pauseApartmentStatusFx as any,
});

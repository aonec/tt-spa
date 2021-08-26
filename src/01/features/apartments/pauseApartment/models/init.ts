import { GetProblemDevicesRequestPayload } from './../../../../_api/apartments';
import {
  ApartmentGate,
  refetchApartment,
} from './../../displayApartment/models/index';
import {
  pauseApartmentForm,
  pauseApartmentModalCancelButtonClicked,
  pauseApartmentStatusFx,
} from './index';
import { $isPauseApartmentModalVisible, pauseApartmentButtonClicked } from '.';
import { setApartmentStatus } from '01/_api/apartments';
import { sample, combine, forward } from 'effector';
import { EApartmentStatus } from 'myApi';

pauseApartmentStatusFx.use(setApartmentStatus);

$isPauseApartmentModalVisible
  .on(pauseApartmentButtonClicked, () => true)
  .reset(
    pauseApartmentModalCancelButtonClicked,
    pauseApartmentStatusFx.doneData
  );

forward({
  from: pauseApartmentStatusFx.done,
  to: refetchApartment,
});

forward({
  from: [
    pauseApartmentStatusFx.doneData,
    pauseApartmentModalCancelButtonClicked,
  ],
  to: pauseApartmentForm.reset,
});

sample({
  source: combine(
    ApartmentGate.state as any,
    pauseApartmentForm.$values,
    (
      { id: apartmentId }: { id: number },
      values: any
    ): GetProblemDevicesRequestPayload => ({
      apartmentId,
      requestPayload: {
        fromDate: values.fromDate,
        toDate: values.toDate,
        status: EApartmentStatus.Pause,
      },
    })
  ),
  clock: pauseApartmentForm.formValidated,
  target: pauseApartmentStatusFx as any,
});

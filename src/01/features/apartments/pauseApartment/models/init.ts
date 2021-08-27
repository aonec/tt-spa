import {
  GetProblemDevicesRequestPayload,
} from './../../../../_api/apartments';
import {
  ApartmentGate,
  refetchApartment,
} from './../../displayApartment/models/index';
import {
  cancelPauseApartmentButtonClicked,
  pauseApartmentForm,
  pauseApartmentModalCancelButtonClicked,
  pauseApartmentStatusFx,
} from './index';
import { $isPauseApartmentModalVisible, pauseApartmentButtonClicked } from '.';
import { setApartmentStatus } from '01/_api/apartments';
import { sample, combine, forward } from 'effector';
import { EApartmentStatus } from 'myApi';
import { FileData } from '01/hooks/useFilesUpload';

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

const payload = combine(
  ApartmentGate.state as any,
  pauseApartmentForm.$values as any,
  (
    { id: apartmentId }: { id: number },
    values: { fromDate: string; toDate: string; documents: FileData[] }
  ): GetProblemDevicesRequestPayload => ({
    apartmentId,
    requestPayload: {
      fromDate: values.fromDate,
      toDate: values.toDate,
      status: EApartmentStatus.Pause,
      documentIds: values.documents
        .filter((elem) => elem.fileResponse)
        .map((elem) => elem.fileResponse?.id!),
    },
  })
);

sample({
  source: payload,
  clock: pauseApartmentForm.formValidated,
  target: pauseApartmentStatusFx as any,
});

sample({
  source: combine(
    ApartmentGate.state as any,
    pauseApartmentForm.$values as any,
    (
      { id: apartmentId }: { id: number },
      values: { fromDate: string; toDate: string; documents: FileData[] }
    ): GetProblemDevicesRequestPayload => ({
      apartmentId,
      requestPayload: {
        fromDate: null,
        toDate: null,
        status: EApartmentStatus.Ok,
      },
    })
  ),
  clock: cancelPauseApartmentButtonClicked,
  target: pauseApartmentStatusFx as any,
});

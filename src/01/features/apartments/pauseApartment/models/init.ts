import { GetProblemDevicesRequestPayload } from './../../../../_api/apartments';
import {
  ApartmentGate,
  refetchApartment,
} from './../../displayApartment/models/index';
import {
  PauseApartmentGate,
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
import moment from 'moment';

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
  pauseApartmentForm.$values as any,
  (values: {
    fromDate: string;
    toDate: string;
    documents: FileData[];
    apartmentId: number;
  }): GetProblemDevicesRequestPayload => ({
    apartmentId: values.apartmentId,
    requestPayload: {
      fromDate: moment(values.fromDate).format('YYYY-MM-DD'),
      toDate: moment(values.toDate).format('YYYY-MM-DD'),
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
  source: PauseApartmentGate.state,
  clock: cancelPauseApartmentButtonClicked,
  fn: (source) => ({
    apartmentId: source.id,
    requestPayload: {
      fromDate: null,
      toDate: null,
      status: EApartmentStatus.Ok,
    },
  }),
  target: pauseApartmentStatusFx,
});

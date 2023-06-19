import { refetchApartment } from './../../displayApartment/models/index';
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
import moment from 'moment';
import { message } from 'antd';
import { handleResetProblemDevices } from '../../displayProblemDevices/models';

pauseApartmentStatusFx.use(setApartmentStatus);

$isPauseApartmentModalVisible
  .on(pauseApartmentButtonClicked, () => true)
  .reset(
    pauseApartmentModalCancelButtonClicked,
    pauseApartmentStatusFx.doneData,
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
  to: [pauseApartmentForm.reset, handleResetProblemDevices],
});

const payload = combine(
  PauseApartmentGate.state,
  pauseApartmentForm.$values,
  ({ id }, values) => ({
    apartmentId: id,
    requestPayload: {
      fromDate: moment(values.fromDate).format('YYYY-MM-DD'),
      toDate: moment(values.toDate).format('YYYY-MM-DD'),
      status: EApartmentStatus.Pause,
      documentIds: values.documents
        .map((document) => document.id)
        .filter((documentId): documentId is number => Boolean(documentId)),
    },
  }),
);

sample({
  clock: pauseApartmentForm.formValidated,
  source: payload,
  target: pauseApartmentStatusFx,
});

sample({
  clock: cancelPauseApartmentButtonClicked,
  source: PauseApartmentGate.state,
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

pauseApartmentStatusFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});
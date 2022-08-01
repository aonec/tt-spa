import { GetProblemDevicesRequestPayload, setApartmentStatus } from './../../../../_api/apartments';
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
import { sample, combine, forward } from 'effector';
import moment from 'moment';
import { EApartmentStatus } from '../../../../../api/types';
import { FileData } from '../../../../hooks/useFilesUpload';

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
  source: combine(
    ApartmentGate.state as any,
    pauseApartmentForm.$values as any,
    ({ id: apartmentId }: { id: number }): GetProblemDevicesRequestPayload => ({
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

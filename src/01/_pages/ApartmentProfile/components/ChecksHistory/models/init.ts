import {
  openCheckApartmentModal,
  closeCheckApartmentModal,
  checkApartmentFx,
  checkApartmentForm,
  removeApartmentCheckFx,
  removeApartmentCheckEv,
  $editApartmentCheckModalPayload,
  openEditApartmentCheckModal,
  editApartmentCheckFx,
  clearPayloadFile,
  $isEditApartmentCheckModalOpen,
} from './index';
import { $isCheckApartmentModalOpen } from '.';
import { combine, sample, forward, guard } from 'effector';
import {
  checkApartment,
  putApartmentCheck,
  removeApartmentCheck,
} from '01/_api/apartments';
import moment from 'moment';
import {
  $apartment,
  ApartmentGate,
} from '01/features/apartments/displayApartment/models';
import { refetchApartmentCheckHistory } from '01/features/apartments/displayApartmentChecksHistory/models';

checkApartmentFx.use(checkApartment);
editApartmentCheckFx.use(putApartmentCheck);

removeApartmentCheckFx.use(removeApartmentCheck);

$isCheckApartmentModalOpen
  .on(openCheckApartmentModal, () => true)
  .reset(closeCheckApartmentModal, checkApartmentFx.done);

sample({
  source: combine(
    ApartmentGate.state.map(({ id }) => id),
    checkApartmentForm.$values,
    (id, values) => ({
      apartmentId: id,
      data: {
        ...values,
        checkingDate: moment(values.checkingDate).format('YYYY-MM-DD'),
        documentId: values.documentIds.map((elem) => elem.fileResponse?.id)[0],
      },
    })
  ),
  clock: guard({
    source: $isCheckApartmentModalOpen,
    clock: checkApartmentForm.formValidated,
    filter: (isOpen) => isOpen,
  }),
  target: checkApartmentFx as any,
});

sample({
  source: combine(
    ApartmentGate.state.map(({ id }) => id),
    $editApartmentCheckModalPayload,
    checkApartmentForm.$values,
    (apartmentId, payload, data) => ({
      apartmentId,
      apartmentCheckId: payload?.id!,
      data,
    })
  ),
  fn: ({ apartmentId, apartmentCheckId, data }) => ({
    apartmentId,
    apartmentCheckId,
    data: {
      ...data,
      documentId: data.documentIds[0]?.fileResponse?.id,
    },
  }),
  clock: guard({
    source: $isEditApartmentCheckModalOpen,
    clock: checkApartmentForm.formValidated,
    filter: (isOpen) => isOpen,
  }),
  target: editApartmentCheckFx,
});

forward({
  from: checkApartmentFx.done,
  to: [refetchApartmentCheckHistory, checkApartmentForm.reset],
});

sample({
  source: $apartment,
  clock: removeApartmentCheckEv,
  fn: (apartment, checkId) => ({ apartmentId: apartment?.id!, checkId }),
  target: removeApartmentCheckFx,
});

forward({
  from: removeApartmentCheckFx.done,
  to: refetchApartmentCheckHistory,
});

$editApartmentCheckModalPayload
  .on(openEditApartmentCheckModal, (_, payload) => {
    return payload;
  })
  .reset(closeCheckApartmentModal)
  .on(clearPayloadFile, (payload) =>
    payload ? { ...payload, checkingAct: null } : null
  );

sample({
  clock: openEditApartmentCheckModal,
  fn: (payload) => {
    return {
      ...payload,
      documentIds: payload?.checkingAct
        ? [
            {
              id: Date.now(),
              fileResponse: payload?.checkingAct,
            },
          ]
        : [],
    };
  },
  target: checkApartmentForm.setForm,
});

forward({
  from: closeCheckApartmentModal,
  to: [checkApartmentForm.reset],
});

forward({
  from: editApartmentCheckFx.doneData,
  to: [closeCheckApartmentModal, refetchApartmentCheckHistory],
});

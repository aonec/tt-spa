import { refetchApartmentCheckHistory } from './../../displayApartmentChecksHistory/models/index';
import {
  openCheckApartmentModal,
  closeCheckApartmentModal,
  checkApartmentFx,
  checkApartmentForm,
  removeApartmnetCheckFx,
  removeApartmentCheckEv,
  $editApartmentCheckModalPayload,
  openEditApartmentCheckModal,
  editApartmentCheckFx,
  clearPayloadFile,
  saveEditApartmentCheck,
} from './index';
import { $isCheckApartmentModalOpen } from '.';
import {
  combine,
  sample,
  forward,
} from '../../../../../../node_modules/effector';
import { $apartment, ApartmentGate } from '../../displayApartment/models';
import {
  checkApartment,
  putApartmentCheck,
  removeApartmentCheck,
} from '01/_api/apartments';
import moment from 'moment';

checkApartmentFx.use(checkApartment);
editApartmentCheckFx.use(putApartmentCheck);

removeApartmnetCheckFx.use(removeApartmentCheck);

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
  clock: checkApartmentForm.formValidated,
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
    data: { ...data, checkingAct: data.documentIds[0]?.fileResponse?.id },
  }),
  clock: saveEditApartmentCheck,
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
  target: removeApartmnetCheckFx,
});

forward({
  from: removeApartmnetCheckFx.done,
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

import { refetchApartmentCheckHistory } from './../../displayApartmentChecksHistory/models/index';
import {
  openCheckApartmentModal,
  closeCheckApartmentModal,
  checkApartmentFx,
  checkApartmentForm,
} from './index';
import { $isCheckApartmentModalOpen } from '.';
import {
  combine,
  sample,
  forward,
} from '../../../../../../node_modules/effector';
import { ApartmentGate } from '../../displayApartment/models';
import { checkApartment } from '01/_api/apartments';
import moment from 'moment';

checkApartmentFx.use(checkApartment);

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
        checkingDate: moment(values.checkingDate).toISOString(true),
        documentIds: values.documentIds.map((elem) => elem.fileResponse?.id),
      },
    })
  ),
  clock: checkApartmentForm.formValidated,
  target: checkApartmentFx as any,
});

forward({
  from: checkApartmentFx.done,
  to: [refetchApartmentCheckHistory, checkApartmentForm.reset],
});

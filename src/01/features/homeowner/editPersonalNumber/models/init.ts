import {
  openEditPersonalNumberTypeModal,
  closeEditPersonalNumberTypeModal,
  personalNumberEditForm,
} from './index';
import { $isSelectEditPersonalNumberTypeModalOpen } from '.';
import { forward } from 'effector';
import { fetchHomeowner } from '../../displayHomeowner/models';

$isSelectEditPersonalNumberTypeModalOpen
  .on(openEditPersonalNumberTypeModal, () => true)
  .reset(closeEditPersonalNumberTypeModal);

forward({
  from: fetchHomeowner.doneData.map(
    ({ name, phoneNumber, personalAccountNumber, paymentCode, openAt }) =>
      ({
        name,
        phoneNumber,
        personalAccountNumber,
        paymentCode,
        isMainAccountingNumber: false,
        openAt,
      } as any)
  ),
  to: personalNumberEditForm.setForm,
});

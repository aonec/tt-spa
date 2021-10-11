import { createStore, createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $isSelectEditPersonalNumberTypeModalOpen = createStore(false);

export const openEditPersonalNumberTypeModal = createEvent();
export const closeEditPersonalNumberTypeModal = createEvent();

export const personalNumberEditForm = createForm({
  fields: {
    name: {
      init: '',
    },
    phoneNumber: {
      init: '',
    },
    openAt: {
      init: null as string | null,
    },
    personalAccountNumber: {
      init: null as string | null,
    },
    paymentCode: {
      init: null as number | null,
    },
    isMainAccountingNumber: {
      init: false,
    },
  },
});

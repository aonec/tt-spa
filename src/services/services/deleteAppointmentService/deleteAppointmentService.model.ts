import { createDomain, sample } from 'effector';
import { message } from 'antd';
import { removeAppointmentMutation } from './deleteAppointmentService.api';
import { apartmentSealService } from '../apartmentSealService';

const domain = createDomain('deleteAppointmentService');

const openModal = domain.createEvent<string>();
const closeModal = domain.createEvent();

const $appointmentId = domain
  .createStore<string | null>(null)
  .on(openModal, (_, id) => id)
  .reset(closeModal);

const $isOpen = $appointmentId.map(Boolean);

const removeAppointment = domain.createEvent();

sample({
  source: $appointmentId,
  filter: Boolean,
  clock: removeAppointment,
  target: removeAppointmentMutation.start,
});

sample({
  clock: removeAppointmentMutation.finished.success,
  target: [closeModal, apartmentSealService.inputs.refetchAppointment],
});

removeAppointmentMutation.finished.success.watch(() =>
  message.success('Заявка успешно удалена!'),
);

removeAppointmentMutation.finished.failure.watch(({ error }) =>
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  ),
);

export const deleteAppointmentService = {
  inputs: {
    openModal,
    closeModal,
    removeAppointment,
  },
  outputs: {
    $isOpen,
    $appointmentId,
  },
};

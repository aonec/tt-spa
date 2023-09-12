import React from 'react';
import { deleteAppointmentService } from './deleteAppointmentService.model';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { useUnit } from 'effector-react';
import { removeAppointmentMutation } from './deleteAppointmentService.api';

const { inputs, outputs } = deleteAppointmentService;

export const DeleteAppointmentContainer = () => {
  const { closeModal, isOpen, removeAppointment, isLoading } = useUnit({
    isOpen: outputs.$isOpen,
    closeModal: inputs.closeModal,
    removeAppointment: inputs.removeAppointment,
    isLoading: removeAppointmentMutation.$pending,
  });

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={closeModal}
      type="danger"
      title="Вы уверены, что хотите удалить заявку?"
      onSubmit={removeAppointment}
      isLoading={isLoading}
    />
  );
};

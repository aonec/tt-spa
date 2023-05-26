import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { setSealAppointmentsService } from './setSealAppointmentsService.model';
import { useEvent, useStore } from 'effector-react';
import { SetSealAppointmentForm } from './view/SetSealAppointmentForm';

const { inputs, outputs } = setSealAppointmentsService;
const formId = 'set-seal-appointment';

export const SetSealAppointmentsContainer = () => {
  const isOpen = useStore(outputs.$isOpen);

  const closeModal = useEvent(inputs.closeModal);

  return (
    <FormModal
      visible={isOpen}
      formId={formId}
      onCancel={closeModal}
      form={<SetSealAppointmentForm />}
      title="Распределение записей опломбировки"
      submitBtnText="Выдать задание"
    />
  );
};

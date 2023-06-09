import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { createSealService } from './createSealService.model';
import { useEvent, useStore } from 'effector-react';
import { CreateSealAppointmentForm } from './view/CreateSealAppointmentForm';

const { inputs, outputs } = createSealService;
const fromId = 'create-seal-appointment';

export const CreateSealContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const apartment = useStore(outputs.$apartment);

  const closeModal = useEvent(inputs.closeModal);
  const handleCreateAppointment = useEvent(inputs.createSealAppointment);

  return (
    <FormModal
      visible={isOpen}
      title="Запись на опломбировку"
      submitBtnText="Создать запись"
      form={
        apartment && (
          <CreateSealAppointmentForm
            formId={fromId}
            handleCreateAppointment={handleCreateAppointment}
            apartment={apartment}
          />
        )
      }
      formId={fromId}
      onCancel={closeModal}
    />
  );
};

import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { createSealService } from './createSealService.model';
import { useUnit } from 'effector-react';
import { CreateSealAppointmentForm } from './view/CreateSealAppointmentForm';
import { WorkWithAppointmentType } from './createSealService.types';

const { inputs, outputs } = createSealService;
const fromId = 'create-seal-appointment';

export const CreateSealContainer = () => {
  const {
    apartment,
    closeModal,
    handleWorkWithAppointment,
    isOpen,
    appointment,
    actionType,
  } = useUnit({
    isOpen: outputs.$isOpen,
    apartment: outputs.$apartment,
    appointment: outputs.$appointment,
    closeModal: inputs.closeModal,
    handleWorkWithAppointment: inputs.workWithAppointment,
    actionType: outputs.$actionType,
  });

  const submitText = useMemo(() => {
    if (actionType === WorkWithAppointmentType.create) {
      return 'Создать запись';
    }
    return 'Редактировать запись';
  }, [actionType]);

  return (
    <FormModal
      visible={isOpen}
      title="Запись на опломбировку"
      submitBtnText={submitText}
      form={
        apartment && (
          <CreateSealAppointmentForm
            formId={fromId}
            handleWorkWithAppointment={handleWorkWithAppointment}
            apartment={apartment}
            appointment={appointment}
          />
        )
      }
      formId={fromId}
      onCancel={closeModal}
    />
  );
};

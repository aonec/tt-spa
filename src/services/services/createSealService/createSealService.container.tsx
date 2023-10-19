import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { createSealService } from './createSealService.model';
import { useUnit } from 'effector-react';
import { CreateSealAppointmentForm } from './view/CreateSealAppointmentForm';
import { WorkWithAppointmentType } from './createSealService.types';
import { districtAppoinmtentsOnMonthQuery } from './createSealService.api';

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
    setMonth,
    appointmentsOnMonthData,
    appointmentsOnMonthLoading,
    districtId,
  } = useUnit({
    isOpen: outputs.$isOpen,
    apartment: outputs.$apartment,
    appointment: outputs.$appointment,
    closeModal: inputs.closeModal,
    handleWorkWithAppointment: inputs.workWithAppointment,
    actionType: outputs.$actionType,
    setMonth: inputs.setMonth,
    appointmentsOnMonthData: districtAppoinmtentsOnMonthQuery.$data,
    appointmentsOnMonthLoading: districtAppoinmtentsOnMonthQuery.$pending,
    districtId: outputs.$districtId,
  });

  const submitText = useMemo(() => {
    if (actionType === WorkWithAppointmentType.create) {
      return 'Создать запись';
    }
    return 'Сохранить';
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
            setMonth={setMonth}
            appointmentsOnMonthData={appointmentsOnMonthData || {}}
            appointmentsOnMonthLoading={appointmentsOnMonthLoading}
            districtId={districtId}
          />
        )
      }
      formId={fromId}
      onCancel={closeModal}
    />
  );
};

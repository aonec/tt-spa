import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConfirmUsingExistingApartmentForm } from './ConfirmUsingExistingApartmentForm';
import { useEvent, useStore } from 'effector-react';
import { confirmUsingExistingArartmentService } from './confirmUsingExistingArartmentService.model';

const formId = 'confirm-using-existing-arartment-modal';

const { inputs, outputs } = confirmUsingExistingArartmentService;

export const ConfirmUsingExistingArartmentModal = () => {
  const isVisible = useStore(outputs.$isConfirmExistingApartmentModalOpen);
  const devices = useStore(outputs.$devices);
  const apartment = useStore(outputs.$apartment);

  const isDeviceLoading = useStore(outputs.$isDeviceLoading);
  const isApartmentLoading = useStore(outputs.$isApartmentLoading);

  const handleCloseModal = useEvent(inputs.handleCloseModal);

  const isPending = isApartmentLoading || isDeviceLoading;

  return (
    <FormModal
      visible={isVisible}
      onCancel={handleCloseModal}
      title="Разделение лицевого счёта"
      onSubmit={() => {}}
      submitBtnText="Сохранить"
      formId={formId}
      form={
        <ConfirmUsingExistingApartmentForm
          devices={devices}
          apartment={apartment}
          isPending={isPending}
        />
      }
    />
  );
};

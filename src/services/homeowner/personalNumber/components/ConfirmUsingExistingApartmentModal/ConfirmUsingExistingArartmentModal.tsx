import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConfirmUsingExistingApartmentForm } from './ConfirmUsingExistingApartmentForm';
import { useUnit } from 'effector-react';
import { confirmUsingExistingArartmentService } from './confirmUsingExistingArartmentService.model';

const formId = 'confirm-using-existing-arartment-modal';

const { inputs, outputs } = confirmUsingExistingArartmentService;

export const ConfirmUsingExistingArartmentModal = () => {
  const {
    apartment,
    devices,
    handleCloseModal,
    handleSplitInExistApart,
    isApartmentLoading,
    isDeviceLoading,
    isVisible,
  } = useUnit({
    isVisible: outputs.$isConfirmExistingApartmentModalOpen,
    devices: outputs.$devices,
    apartment: outputs.$apartment,
    isDeviceLoading: outputs.$isDeviceLoading,
    isApartmentLoading: outputs.$isApartmentLoading,
    handleCloseModal: inputs.handleCloseModal,
    handleSplitInExistApart: inputs.handleSplitInExistApart,
  });

  const isPending = isApartmentLoading || isDeviceLoading;

  const isApartmentHasDevices = Boolean(devices?.length);
  const isApartmentHasHomeowners = Boolean(apartment?.homeownerAccounts);

  return (
    <FormModal
      visible={isVisible}
      onCancel={handleCloseModal}
      title="Разделение лицевого счёта"
      onSubmit={handleSplitInExistApart}
      submitBtnText="Сохранить"
      formId={formId}
      disabled={isPending || isApartmentHasDevices || isApartmentHasHomeowners}
      form={
        <ConfirmUsingExistingApartmentForm
          devices={devices}
          apartment={apartment}
          isPending={isPending}
          isApartmentHasHomeowners={isApartmentHasHomeowners}
          isApartmentHasDevices={isApartmentHasDevices}
        />
      }
    />
  );
};

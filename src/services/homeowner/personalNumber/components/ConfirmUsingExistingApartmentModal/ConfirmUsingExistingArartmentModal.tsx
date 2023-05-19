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
  const handleSplitInExistApart = useEvent(inputs.handleSplitInExistApart);

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

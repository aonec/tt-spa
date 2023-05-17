import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditHomeownerForm } from '../HomeownerForm';
import { createHomeownerService } from './createHomeownerService.model';
import { ConfirmationAddingExistingPersonalNumber } from 'services/homeowner/personalNumber/components/ConfirmationAddingExistingPersonalNumberModal';

const { inputs, outputs } = createHomeownerService;

const formId = 'create-homeowner-form';

export const CreateHomeownerContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);
  const samePersonalAccountNumderId = useStore(
    outputs.$samePersonalAccountNumderId,
  );
  const isConfirmationModalOpen = useStore(outputs.$isConfirmationModalOpen);

  const handleCloseModal = useEvent(inputs.closeCreateHomeownerModal);
  const handleCreateHomeowner = useEvent(inputs.handleCreateHomeowner);
  const confirmationModalClose = useEvent(inputs.handleConfirmationModalClose);
  const handleForced = useEvent(inputs.onForced);

  return (
    <>
      <FormModal
        visible={isModalOpen}
        onCancel={() => handleCloseModal()}
        title="Добавить собственника"
        submitBtnText="Добавить собственника"
        formId={formId}
        loading={isLoading}
        form={
          <EditHomeownerForm
            formId={formId}
            handleCreateHomeowner={handleCreateHomeowner}
          />
        }
      />
      <ConfirmationAddingExistingPersonalNumber
        confirmationModalClose={confirmationModalClose}
        handleForced={handleForced}
        isConfirmationModalOpen={isConfirmationModalOpen}
        samePersonalAccountNumderId={samePersonalAccountNumderId}
      />
    </>
  );
};

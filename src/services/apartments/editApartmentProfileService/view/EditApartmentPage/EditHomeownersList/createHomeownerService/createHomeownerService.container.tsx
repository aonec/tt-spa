import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditHomeownerForm } from '../HomeownerForm';
import { createHomeownerService } from './createHomeownerService.model';
import { ConfirmationAddingExistingPersonalNumber } from 'services/homeowner/personalNumber/components/ConfirmationAddingExistingPersonalNumberModal';

const { inputs, outputs } = createHomeownerService;

const formId = 'create-homeowner-form';

export const CreateHomeownerContainer = () => {
  const {
    confirmationModalClose,
    handleCloseModal,
    handleCreateHomeowner,
    handleForced,
    isConfirmationModalOpen,
    isLoading,
    isModalOpen,
    samePersonalAccountNumderId,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    isLoading: outputs.$isLoading,
    samePersonalAccountNumderId: outputs.$samePersonalAccountNumderId,
    isConfirmationModalOpen: outputs.$isConfirmationModalOpen,
    handleCloseModal: inputs.closeCreateHomeownerModal,
    handleCreateHomeowner: inputs.handleCreateHomeowner,
    confirmationModalClose: inputs.handleConfirmationModalClose,
    handleForced: inputs.onForced,
  });

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

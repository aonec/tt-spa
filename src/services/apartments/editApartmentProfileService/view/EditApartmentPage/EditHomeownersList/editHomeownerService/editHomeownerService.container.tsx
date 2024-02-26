import { useUnit } from 'effector-react';
import { EPersonType } from 'api/types';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditHomeownerForm } from '../HomeownerForm';
import { editHomeownerService } from './editHomeownerService.model';
import { ConfirmationAddingExistingPersonalNumber } from 'services/homeowner/personalNumber/components/ConfirmationAddingExistingPersonalNumberModal';
import { EditHomeownerPayload } from '../HomeownerForm/EditHomeownerForm.types';

const { inputs, outputs } = editHomeownerService;

const formId = 'edit-homeowner-modal';

export const EditHomeownerContainer = () => {
  const {
    confirmationModalClose,
    handleCloseModal,
    handleEditHomeowner,
    handleForced,
    homeownerPayload,
    isConfirmationModalOpen,
    isLoading,
    isModalOpen,
    samePersonalAccountNumderId,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    isLoading: outputs.$isLoading,
    homeownerPayload: outputs.$housingStockPayload,
    samePersonalAccountNumderId: outputs.$samePersonalAccountNumderId,
    isConfirmationModalOpen: outputs.$isConfirmationModalOpen,
    handleCloseModal: inputs.closeEditHomeownerModal,
    handleEditHomeowner: inputs.handleEditHomeowner,
    confirmationModalClose: inputs.handleConfirmationModalClose,
    handleForced: inputs.onForced,
  });

  const handleEditHomeownerPreparation = (payload: EditHomeownerPayload) => {
    if (!homeownerPayload?.id) return;

    handleEditHomeowner({
      id: homeownerPayload?.id,
      name: payload.name,
      personalAccountNumber: payload.personalAccountNumber,
      paymentCode: payload.paymentCode,
      personType: String(payload.personType) as EPersonType,
      isMainOnApartment: payload.isMainOnApartment,
      openAt: payload.openAt,
    });
  };

  return (
    <>
      <FormModal
        visible={isModalOpen}
        onCancel={() => handleCloseModal()}
        title="Редактирование собственника"
        submitBtnText="Сохранить"
        formId={formId}
        loading={isLoading}
        form={
          homeownerPayload && (
            <EditHomeownerForm
              formId={formId}
              handleEditHomeownerPreparation={handleEditHomeownerPreparation}
              initialValues={homeownerPayload}
              isEdit={isModalOpen}
            />
          )
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

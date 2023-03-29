import { useEvent, useStore } from 'effector-react';
import { EPersonType } from 'myApi';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditHomeownerForm } from '../HomeownerForm';
import { editHomeownerService } from './editHomeownerService.model';
import { EditHomeownerRequestPayload } from './editHomeownerService.types';
import { ConfirmationAddingExistingPersonalNumber } from '01/features/homeowner/editPersonalNumber/components/ConfirmationAddingExistingPersonalNumberModal';

const { inputs, outputs } = editHomeownerService;

const formId = 'edit-homeowner-modal';

export const EditHomeownerContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);
  const housingStockPayload = useStore(outputs.$housingStockPayload);
  const samePersonalAccountNumderId = useStore(
    outputs.$samePersonalAccountNumderId,
  );
  const isConfirmationModalOpen = useStore(outputs.$isConfirmationModalOpen);

  const handleCloseModal = useEvent(inputs.closeEditHomeownerModal);
  const handleEditHomeowner = useEvent(inputs.handleEditHomeowner);
  const confirmationModalClose = useEvent(inputs.handleConfirmationModalClose);
  const handleForced = useEvent(inputs.onForced);

  const handleEditHomeownerPreparation = (
    payload: EditHomeownerRequestPayload,
  ) => {
    if (!housingStockPayload?.id) return;

    handleEditHomeowner({
      id: housingStockPayload?.id,
      personalAccountNumber: payload.personalAccountNumber,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      paymentCode: payload.paymentCode,
      personType: String(payload.personType) as EPersonType,
      isMainOnApartment: payload.isMainOnApartment,
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
          housingStockPayload && (
            <EditHomeownerForm
              formId={formId}
              handleEditHomeownerPreparation={handleEditHomeownerPreparation}
              initialValues={housingStockPayload}
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

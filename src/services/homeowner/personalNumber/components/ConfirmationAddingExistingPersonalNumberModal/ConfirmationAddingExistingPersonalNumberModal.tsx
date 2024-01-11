import React, { FC, useEffect } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConfirmationAddingExistingPersonalNumberForm } from './ConfirmationAddingExistingPersonalNumberForm';
import { ConfirmationAddingExistingPersonalNumberProps } from './ConfirmationAddingExistingPersonalNumberModal.types';
import { ConfirmationAddingExistingPersonalNumberModal } from './ConfirmationAddingExistingPersonalNumberModal.model';
import { useUnit } from 'effector-react';

const { inputs, outputs } = ConfirmationAddingExistingPersonalNumberModal;
const formId = 'confirm-adding-existing-personal-number';

export const ConfirmationAddingExistingPersonalNumber: FC<
  ConfirmationAddingExistingPersonalNumberProps
> = ({
  isConfirmationModalOpen,
  samePersonalAccountNumderId,
  confirmationModalClose,
  handleForced,
}) => {
  const {
    handleSamePersonalAccountNumderId,
    samePersonalAccountNumderApartmentData,
  } = useUnit({
    handleSamePersonalAccountNumderId: inputs.samePersonalAccountNumderId,
    samePersonalAccountNumderApartmentData:
      outputs.$samePersonalAccountNumderApartmentData,
  });

  useEffect(() => {
    if (samePersonalAccountNumderId) {
      handleSamePersonalAccountNumderId(samePersonalAccountNumderId);
    }
  }, [samePersonalAccountNumderId, handleSamePersonalAccountNumderId]);

  return (
    <FormModal
      visible={isConfirmationModalOpen}
      onCancel={() => confirmationModalClose()}
      title="Данный лицевой счёт уже существует"
      onSubmit={() => {
        handleForced();
      }}
      submitBtnText="Все равно сохранить"
      formId={formId}
      form={
        <ConfirmationAddingExistingPersonalNumberForm
          samePersonalAccountNumderApartmentData={
            samePersonalAccountNumderApartmentData
          }
        />
      }
    />
  );
};

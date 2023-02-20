import React, { FC, useEffect } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConfirmationAddingExistingPersonalNumberForm } from './ConfirmationAddingExistingPersonalNumberForm';
import { ConfirmationAddingExistingPersonalNumberProps } from './ConfirmationAddingExistingPersonalNumberModal.types';
import { ConfirmationAddingExistingPersonalNumberModal } from './ConfirmationAddingExistingPersonalNumberModal.model';
import { useEvent, useStore } from 'effector-react';

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
  const handleSamePersonalAccountNumderId = useEvent(
    inputs.samePersonalAccountNumderId,
  );

  const samePersonalAccountNumderApartmentData = useStore(
    outputs.$samePersonalAccountNumderApartmentData,
  );

  useEffect(() => {
    if (samePersonalAccountNumderId) {
      handleSamePersonalAccountNumderId(samePersonalAccountNumderId);
    }
  }, [samePersonalAccountNumderId, handleSamePersonalAccountNumderId]);

  return (
    <FormModal
      visible={isConfirmationModalOpen}
      onCancel={() => confirmationModalClose()}
      title="Данный лицевой счет уже существует"
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

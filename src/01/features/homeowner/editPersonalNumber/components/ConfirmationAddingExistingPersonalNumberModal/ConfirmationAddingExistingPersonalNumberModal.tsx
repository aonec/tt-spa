import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConfirmationAddingExistingPersonalNumberForm } from './ConfirmationAddingExistingPersonalNumberForm';
import { ConfirmationAddingExistingPersonalNumberProps } from './ConfirmationAddingExistingPersonalNumberModal.types';

const formId = 'confirm-adding-existing-personal-number';

export const ConfirmationAddingExistingPersonalNumber: FC<
  ConfirmationAddingExistingPersonalNumberProps
> = ({
  isConfirmationModalOpen,
  samePersonalAccountNumderId,
  confirmationModalClose,
  handleForced,
}) => {
  return (
    <FormModal
      visible={isConfirmationModalOpen}
      onCancel={() => confirmationModalClose()}
      title="Данный лицевой счет уже существует"
      onSubmit={() => {
        handleForced();
        console.log('forced 1');
      }}
      submitBtnText="Все равно сохранить!"
      formId={formId}
      form={
        <ConfirmationAddingExistingPersonalNumberForm
          samePersonalAccountNumderId={samePersonalAccountNumderId}
        />
      }
    />
  );
};

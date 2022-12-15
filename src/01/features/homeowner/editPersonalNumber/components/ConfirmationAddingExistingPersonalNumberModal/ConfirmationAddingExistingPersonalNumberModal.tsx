import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConfirmationAddingExistingPersonalNumberForm } from './ConfirmationAddingExistingPersonalNumberForm';
import { ConfirmationAddingExistingPersonalNumberProps } from './ConfirmationAddingExistingPersonalNumberModal.types';

const formId = 'confirm-adding-existing-personal-number';

export const ConfirmationAddingExistingPersonalNumber: FC<ConfirmationAddingExistingPersonalNumberProps> = ({}) => {
  return (
    <FormModal
      visible={false}
      onCancel={() => {}}
      title="Данный лицевой счет уже существует"
      onSubmit={() => {}}
      submitBtnText="Все равно сохранить!"
      formId={formId}
      form={<ConfirmationAddingExistingPersonalNumberForm />}
    />
  );
};

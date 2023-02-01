import React, { FC } from 'react';
import { AddContractorModalProps } from './AddContractorModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { AddContractorForm } from './AddContractorForm';

const formId = 'add-contractor-modal';

export const AddContractorModal: FC<AddContractorModalProps> = ({
  handleCloseModal,
  isModalOpen,
  handleAddcontractor,
}) => {
  return (
    <FormModal
      title="Добавление нового контрагента"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      formId={formId}
      submitBtnText="Добавить"
      form={
        <AddContractorForm
          formId={formId}
          handleAddcontractor={handleAddcontractor}
        />
      }
    />
  );
};

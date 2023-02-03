import React, { FC } from 'react';
import { EditContractorModalProps } from './EditContractorModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { AddContractorForm } from 'services/contractors/addContractorService/view/AddContractorModal/AddContractorForm';

const formId = 'edit-contractor-modal';

export const EditContractorModal: FC<EditContractorModalProps> = ({
  isEditModalOpen,
  contractorData,
  handleCloseModal,
  handleEditcontractor,
}) => {
  return (
    <FormModal
      title="Редактирование контрагента"
      visible={isEditModalOpen}
      onCancel={handleCloseModal}
      formId={formId}
      submitBtnText="Сохранить изменения"
      form={
        <AddContractorForm
          formId={formId}
          handleEditcontractor={handleEditcontractor}
          contractorData={contractorData}
        />
      }
    />
  );
};

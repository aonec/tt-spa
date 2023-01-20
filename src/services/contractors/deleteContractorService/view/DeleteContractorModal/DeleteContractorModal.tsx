import React, { FC } from 'react';
import { DeleteContractorModalProps } from './DeleteContractorModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Form } from 'antd';
import { Description } from './DeleteContractorModal.styled';

const formId = 'delete-contractor-modal';

export const DeleteContractorModal: FC<DeleteContractorModalProps> = ({
  handleCloseModal,
  handleDeleteContractor,
  isModalOpen,
  contractorData,
}) => {
  return (
    <FormModal
      title="Добавление нового контрагента"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      formId={formId}
      submitBtnText="Удалить"
      submitButtonType="danger"
      form={
        <Form id={formId} onSubmitCapture={() => handleDeleteContractor()}>
          <Description>
            Вы действительно хотите удалить контрагента {contractorData?.name} ?
          </Description>
        </Form>
      }
    />
  );
};

import { FC } from 'react';
import { Wrapper } from './AddNodeToIntegrationModal.styled';
import { Props } from './AddNodeToIntegrationModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const AddNodeToIntegrationModal: FC<Props> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  return (
    <FormModal
      formId="add-node-to-integration-modal"
      title="Добавить узел в интеграцию"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={<Wrapper></Wrapper>}
    />
  );
};

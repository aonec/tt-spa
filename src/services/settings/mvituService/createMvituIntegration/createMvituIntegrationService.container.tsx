import { FormModal } from 'ui-kit/Modals/FormModal';
import { createMvituIntegrationService } from './createMvituIntegrationService.models';
import { Wrapper } from './createMvituIntegrationService.styled';
import { useUnit } from 'effector-react';
import FormItem from 'antd/es/form/FormItem';
import { Input } from 'ui-kit/Input';

const { inputs, outputs } = createMvituIntegrationService;

export const CreateMvituIntegrationContainer = () => {
  const { isModalOpen, closeModal } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    closeModal: inputs.closeModal,
  });

  return (
    <FormModal
      visible={isModalOpen}
      onCancel={closeModal}
      title="Настройка интеграции с ВИС МВИТУ"
      formId="mvitu-integration-configure"
      form={
        <Wrapper>
          <FormItem label="ИНН">
            <Input placeholder="Введите ИНН" />
          </FormItem>
          <FormItem label="Юридическое название организации">
            <Input placeholder="Введите название" />
          </FormItem>
        </Wrapper>
      }
    />
  );
};

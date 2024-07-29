import { FormModal } from 'ui-kit/Modals/FormModal';
import { createMvituIntegrationService } from './createMvituIntegrationService.models';
import { Wrapper } from './createMvituIntegrationService.styled';
import { useUnit } from 'effector-react';
import FormItem from 'antd/es/form/FormItem';
import { Input } from 'ui-kit/Input';
import { createOrUpdateIntegration } from './createMvituIntegrationService.api';
import { useFormik } from 'formik';
import { validationSchema } from './createMvituIntegrationService.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

const { inputs, outputs } = createMvituIntegrationService;

export const CreateMvituIntegrationContainer = () => {
  const { isModalOpen, closeModal, handleUpdateIntegration, isLoading } =
    useUnit({
      isModalOpen: outputs.$isModalOpen,
      closeModal: inputs.closeModal,
      handleUpdateIntegration: createOrUpdateIntegration.start,
      isLoading: createOrUpdateIntegration.$pending,
    });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: { inn: '', legalName: '' },
    onSubmit: (values) => {
      handleUpdateIntegration(values);
    },
    validationSchema,
  });

  return (
    <FormModal
      visible={isModalOpen}
      onCancel={closeModal}
      title="Настройка интеграции с ВИС МВИТУ"
      formId="mvitu-integration-configure"
      onSubmit={handleSubmit}
      loading={isLoading}
      form={
        <Wrapper>
          <FormItem label="ИНН">
            <Input
              placeholder="Введите ИНН"
              value={values.inn}
              onChange={handleChange}
              name="inn"
              status={errors.inn && 'error'}
            />
            <ErrorMessage>{errors.inn}</ErrorMessage>
          </FormItem>
          <FormItem label="Юридическое название организации">
            <Input
              placeholder="Введите название"
              value={values.legalName}
              onChange={handleChange}
              name="legalName"
              status={errors.legalName && 'error'}
            />
            <ErrorMessage>{errors.legalName}</ErrorMessage>
          </FormItem>
        </Wrapper>
      }
    />
  );
};

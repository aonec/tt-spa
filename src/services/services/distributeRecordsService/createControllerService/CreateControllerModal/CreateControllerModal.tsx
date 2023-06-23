import React, { FC } from 'react';
import { Wrapper } from './CreateControllerModal.styled';
import { Props } from './CreateControllerModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { validationSchema } from './CreateControllerModal.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

export const CreateControllerModal: FC<Props> = ({
  isLoading,
  isModalOpen,
  closeModal,
  handleCreateIndividualSeal,
}) => {
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
    },
    onSubmit: handleCreateIndividualSeal,
    validationSchema,
  });

  return (
    <FormModal
      formId="create-individual-seal-controller-form"
      title="Создать контролёра"
      visible={isModalOpen}
      loading={isLoading}
      onCancel={closeModal}
      onSubmit={handleSubmit}
      form={
        <Wrapper>
          <FormItem label="Имя">
            <Input
              value={values.firstName}
              onChange={handleChange}
              placeholder="Введите имя"
              name="firstName"
            />
            <ErrorMessage>{errors.firstName}</ErrorMessage>
          </FormItem>
          <FormItem label="Фамилия">
            <Input
              onChange={handleChange}
              value={values.lastName}
              placeholder="Введите фамилию"
              name="lastName"
            />
            <ErrorMessage>{errors.lastName}</ErrorMessage>
          </FormItem>
          <FormItem label="Отчество">
            <Input
              onChange={handleChange}
              value={values.middleName}
              placeholder="Введите отчество"
              name="middleName"
            />
          </FormItem>
        </Wrapper>
      }
    />
  );
};

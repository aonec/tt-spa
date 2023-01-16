import React, { FC } from 'react';
import { AddContractorFormProps } from './AddContractorForm.types';
import { Form } from 'antd';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { useFormik } from 'formik';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { GridContainer } from './AddContractorForm.styled';

export const AddContractorForm: FC<AddContractorFormProps> = ({
  formId,
  handleAddcontractor,
}) => {
  const phoneMask = usePhoneMask();

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      name: null,
      email: null,
      cellphone: null || '',
    },
    onSubmit: (data) => {
      handleAddcontractor(data);
    },
    validateOnChange: false,
  });
  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <FormItem label="Название организации">
        <Input
          placeholder="Введите"
          value={values.name || undefined}
          onChange={(value) => setFieldValue('name', value.target.value)}
        />
        <ErrorMessage>{errors.name}</ErrorMessage>
      </FormItem>

      <GridContainer>
        <FormItem label="Электронная почта">
          <Input
            placeholder="Введите"
            type="email"
            value={values.email || undefined}
            onChange={(value) => setFieldValue('email', value.target.value)}
          />
          <ErrorMessage>{errors.email}</ErrorMessage>
        </FormItem>

        <FormItem label="Контактный телефон">
          <Input
            name="cellphone"
            type="tel"
            placeholder="Введите"
            value={
              values.cellphone && values.cellphone.length > 8
                ? phoneMask.maskValue(values.cellphone || '') || undefined
                : values.cellphone || undefined
            }
            onChange={(value) =>
              setFieldValue(
                'cellphone',
                phoneMask.unmaskedValue(value.target.value)
              )
            }
          />
          <ErrorMessage>{errors.cellphone}</ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};

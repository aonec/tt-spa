import React, { FC } from 'react';
import { AddContractorFormProps } from './AddContractorForm.types';
import { Form } from 'antd';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { GridContainer } from './AddContractorForm.styled';

export const AddContractorForm: FC<AddContractorFormProps> = ({
  formId,
  handleAddcontractor,
  contractorData,
  handleEditcontractor,
}) => {
  const phoneMask = usePhoneMask();

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      name: contractorData?.name || null,
      email: contractorData?.email || null,
      cellphone: contractorData?.cellphone || null || '',
    },
    onSubmit: (data) => {
      handleAddcontractor && handleAddcontractor(data);

      handleEditcontractor &&
        contractorData &&
        handleEditcontractor({ contractorId: contractorData.id, data });
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .nullable()
        .min(2, 'Минимум два символа')
        .required('Обязательное поле'),
    }),
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
        </FormItem>
      </GridContainer>
    </Form>
  );
};

import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Wrapper } from './AddInspectorForm.styled';
import {
  AddInspectorFormProps,
  AddInspectorFormik,
} from './AddInspectorForm.types';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

export const AddInspectorForm: FC<AddInspectorFormProps> = ({
  handleAddInspector,
  formId,
}) => {
  const { values, setFieldValue, handleSubmit, errors } =
    useFormik<AddInspectorFormik>({
      initialValues: { lastName: '', firstName: '', midleName: '' },
      onSubmit: ({ firstName, lastName, midleName }) => {
        const fullName = `${lastName} ${firstName} ${midleName}`;

        handleAddInspector({ fullName });
      },
      validationSchema: Yup.object().shape({
        lastName: Yup.string().required('Это поле обязательное'),
      }),
    });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <Wrapper>
        <FormItem label="Фамилия">
          <Input
            value={values.lastName}
            onChange={(value) => setFieldValue('lastName', value.target.value)}
          />
          <ErrorMessage>{errors.lastName}</ErrorMessage>
        </FormItem>
        <FormItem label="Имя">
          <Input
            value={values.firstName}
            onChange={(value) => setFieldValue('firstName', value.target.value)}
          />
        </FormItem>
        <FormItem label="Отчество">
          <Input
            value={values.midleName}
            onChange={(value) => setFieldValue('midleName', value.target.value)}
          />
        </FormItem>
      </Wrapper>
    </Form>
  );
};

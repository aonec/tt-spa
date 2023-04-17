import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Form } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { validationSchema } from './CreateNodeServiceZoneForm.constants';
import { CreateNodeServiceZoneFormProps } from './CreateNodeServiceZoneForm.types';

export const CreateNodeServiceZoneForm: FC<CreateNodeServiceZoneFormProps> = ({
  handleSubmit,
  formId,
}) => {
  const {
    values,
    handleSubmit: handleSubmitForm,
    handleChange,
    errors,
  } = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
    validationSchema,
    validateOnChange: false,
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmitForm}>
      <FormItem label="Название">
        <Input
          value={values.name}
          name="name"
          onChange={handleChange}
          placeholder="Введите"
        />
        <ErrorMessage>{errors.name}</ErrorMessage>
      </FormItem>
    </Form>
  );
};

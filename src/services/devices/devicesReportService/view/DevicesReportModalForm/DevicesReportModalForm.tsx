import React, { FC } from 'react';
import { DevicesReportModalFormProps } from './DevicesReportModalForm.types';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { InputWithAddon } from 'ui-kit/Input';

export const DevicesReportModalForm: FC<DevicesReportModalFormProps> = ({
  formId,
  handleDownloadDeviceReport,
}) => {
  const { values, setFieldValue, submitForm } = useFormik({
    initialValues: { title: 'Список_приборов' },
    onSubmit: (values) => handleDownloadDeviceReport(values.title),
  });

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <FormItem label="Название списка">
        <InputWithAddon
          value={values.title}
          onChange={(e) => setFieldValue('title', e.target.value)}
          addonAfter=".xlsx"
        />
      </FormItem>
    </Form>
  );
};

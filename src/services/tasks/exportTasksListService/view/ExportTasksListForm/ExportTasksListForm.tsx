import { Select } from '01/shared/ui/Select';
import { Form } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useCallback, useMemo } from 'react';
import { ExportTasksListFormProps } from './ExportTasksListForm.types';
import * as yup from 'yup';
import { SelectValue } from 'antd/lib/select';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { ExportTasksListRequestPayload } from '../../exportTasksListService.types';

export const ExportTasksListForm: FC<ExportTasksListFormProps> = ({
  formId,
  handleSubmit,
  taskFilters,
}) => {
  const { values, submitForm, setFieldValue, errors } = useFormik<{
    type: string;
  }>({
    initialValues: {
      type: '',
    },
    validationSchema: yup.object().shape({
      type: yup.string().nullable().required('Это поле обязательное'),
    }),
    onSubmit: ({ type }) => {
      handleSubmit({
        type,
        name: taskFilters.find((elem) => elem.key === type)?.value!,
      });
    },
  });

  const taskTypeOptions = useMemo(
    () =>
      taskFilters.map(({ key, value }) => (
        <Select.Option value={key} key={key}>
          {value}
        </Select.Option>
      )),
    [taskFilters]
  );

  const selectedTaskType = values.type || undefined;

  const setSelectValue = useCallback(
    (value: SelectValue) => setFieldValue('type', value),
    [setFieldValue]
  );

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <Form.Item label="Тип задачи">
        <Select
          placeholder="Выберите тип задачи"
          onChange={setSelectValue}
          value={selectedTaskType}
        >
          {taskTypeOptions}
        </Select>
        <ErrorMessage>{errors.type}</ErrorMessage>
      </Form.Item>
    </Form>
  );
};

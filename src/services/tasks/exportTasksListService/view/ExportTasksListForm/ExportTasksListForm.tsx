import { Select } from '01/shared/ui/Select';
import { Form } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useCallback, useMemo } from 'react';
import { TaskType } from '../../exportTasksListService.types';
import { ExportTasksListFormProps } from './ExportTasksListForm.types';
import * as yup from 'yup';
import { SelectValue } from 'antd/lib/select';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';

const TaskTypeLookup: { [key in keyof typeof TaskType]: string } = {
  [TaskType.CheckIndividualDevices]: 'Проверка ИПУ',
};

const taskTypes = Object.entries(TaskTypeLookup);

export const ExportTasksListForm: FC<ExportTasksListFormProps> = ({
  formId,
  handleSubmit,
}) => {
  const { values, submitForm, setFieldValue, errors } = useFormik<{
    type: TaskType | null;
  }>({
    initialValues: {
      type: null,
    },
    validationSchema: yup.object().shape({
      type: yup.string().nullable().required('Это поле обязательное'),
    }),
    onSubmit: ({ type }) => {
      handleSubmit({ type: type! });
    },
  });

  const taskTypeOptions = useMemo(
    () =>
      taskTypes.map(([type, name]) => (
        <Select.Option value={type} key={type}>
          {name}
        </Select.Option>
      )),
    [taskTypes]
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

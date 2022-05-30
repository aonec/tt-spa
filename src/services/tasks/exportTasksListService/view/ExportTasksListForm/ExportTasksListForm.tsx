import { Select } from '01/shared/ui/Select';
import { Form } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { TaskType } from '../../exportTasksListService.types';
import { ExportTasksListFormProps } from './ExportTasksListForm.types';

const TaskTypeLookup: { [key in keyof typeof TaskType]: string } = {
  [TaskType.CheckIndividualDevices]: 'Проверка ИПУ',
};

const taskTypes = Object.entries(TaskTypeLookup);

export const ExportTasksListForm: FC<ExportTasksListFormProps> = ({
  formId,
  handleSubmit,
}) => {
  const { values, submitForm } = useFormik<{ type: TaskType | null }>({
    initialValues: {
      type: null,
    },
    onSubmit: (values) => {},
  });

  const taskTypeOptions = taskTypes.map(([type, name]) => (
    <Select.Option value={type} key={type}>
      {name}
    </Select.Option>
  ));

  const selectedTaskType = values.type || undefined;

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <Form.Item label="Тип задачи">
        <Select placeholder="Выберите тип задачи" value={selectedTaskType}>
          {taskTypeOptions}
        </Select>
      </Form.Item>
    </Form>
  );
};

import React, { FC } from 'react';
import { CompletionSelectProps } from './CompletionSelect.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ETaskConfirmationType } from 'api/myApi';
import { completionLabelsDictionary } from 'services/tasks/taskProfileService/taskProfileService.constants';

export const CompletionSelect: FC<CompletionSelectProps> = ({
  taskConfirmationTypes,
  handleChangeConfirmation,
  taskType,
}) => {
  const label = taskType && completionLabelsDictionary[taskType];

  return (
    <FormItem label={label}>
      <Select
        placeholder="Выберите"
        onChange={(value) =>
          value && handleChangeConfirmation(value as ETaskConfirmationType)
        }
      >
        {taskConfirmationTypes?.map((elem) => (
          <Select.Option key={elem.key} value={elem.key!}>
            {elem.value}
          </Select.Option>
        ))}
      </Select>
    </FormItem>
  );
};

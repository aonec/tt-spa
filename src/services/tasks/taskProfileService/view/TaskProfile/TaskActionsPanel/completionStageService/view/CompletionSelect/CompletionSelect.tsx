import React, { FC } from 'react';
import { CompletionSelectProps } from './CompletionSelect.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ETaskConfirmationType } from 'myApi';

export const CompletionSelect: FC<CompletionSelectProps> = ({
  taskConfirmationTypes,
  handleChangeConfirmation,
}) => {
  return (
    <FormItem label="Подтверждение порыва">
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

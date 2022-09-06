import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { EmailNotifySelectProps } from './EmailNotifySelect.types';

export const EmailNotifySelect: FC<EmailNotifySelectProps> = ({
  contractors,
}) => {
  return (
    <FormItem label="Исполнитель">
      <Select placeholder="Выберите исполнителя">
        {contractors.map((contractor) => (
          <Select.Option key={contractor.id} value={contractor.id}>
            {contractor.name}
          </Select.Option>
        ))}
      </Select>
    </FormItem>
  );
};

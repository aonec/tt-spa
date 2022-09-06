import { Select } from '01/shared/ui/Select';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { AddPerpetratorSelectProps } from './AddPerpetratorSelect.types';

export const AddPerpetratorSelect: FC<AddPerpetratorSelectProps> = ({
  users,
}) => {
  return (
    <FormItem label="Исполнитель">
      <Select placeholder="Выберите исполнителя">
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </FormItem>
  );
};

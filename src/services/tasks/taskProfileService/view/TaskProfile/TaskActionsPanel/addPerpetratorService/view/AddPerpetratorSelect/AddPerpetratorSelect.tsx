import { Select } from '01/shared/ui/Select';
import { SelectValue } from 'antd/lib/select';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { AddPerpetratorSelectProps } from './AddPerpetratorSelect.types';

export const AddPerpetratorSelect: FC<AddPerpetratorSelectProps> = ({
  users,
  handlePerpetratorChange,
}) => {
  const [perpetratorId, setPerpetratorId] = useState<number | null>(null);

  useEffect(() => {
    handlePerpetratorChange(perpetratorId);
  }, [perpetratorId]);

  const handleChange = useCallback(
    (value: SelectValue) => {
      if (typeof value === 'number') setPerpetratorId(value);
    },
    [setPerpetratorId],
  );

  return (
    <FormItem label="Исполнитель">
      <Select
        placeholder="Выберите исполнителя"
        value={perpetratorId || undefined}
        onChange={handleChange}
      >
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.firstName} {user.lastName} {user.middleName}
          </Select.Option>
        ))}
      </Select>
    </FormItem>
  );
};

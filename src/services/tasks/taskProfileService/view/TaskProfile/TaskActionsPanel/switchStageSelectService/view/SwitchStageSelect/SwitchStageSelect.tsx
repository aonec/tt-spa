import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SwitchStageSelectProps } from './SwitchStageSelect.types';

export const SwitchStageSelect: FC<SwitchStageSelectProps> = ({}) => {
  return (
    <FormItem label="Действия">
      <Select placeholder="Выберите действие"></Select>
    </FormItem>
  );
};

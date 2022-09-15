import React, { FC } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { SetNextStageDeadlineDatepickerProps } from './SetNextStageDeadlineDatepicker.types';

export const SetNextStageDeadlineDatepicker: FC<SetNextStageDeadlineDatepickerProps> = ({}) => {
  return (
    <FormItem label="Дата">
      <DatePicker placeholder="Выберите дату" format="DD.MM.YYYY" />
    </FormItem>
  );
};

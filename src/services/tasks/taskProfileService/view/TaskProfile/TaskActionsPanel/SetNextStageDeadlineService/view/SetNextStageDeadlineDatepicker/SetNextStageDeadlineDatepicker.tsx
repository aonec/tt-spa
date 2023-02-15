import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { SetNextStageDeadlineDatepickerProps } from './SetNextStageDeadlineDatepicker.types';

export const SetNextStageDeadlineDatepicker: FC<
  SetNextStageDeadlineDatepickerProps
> = ({ handleDateChange }) => {
  const [date, setDate] = useState<moment.Moment | null>(null);

  useEffect(() => {
    const formattedDate = date?.format('YYYY-MM-DD');

    if (formattedDate) handleDateChange(formattedDate);
  }, [date, handleDateChange]);

  return (
    <FormItem label="Дата">
      <DatePicker
        value={date && moment(date)}
        onChange={(date) => setDate(date || null)}
        allowClear
        placeholder="Выберите дату"
        format="DD.MM.YYYY"
      />
    </FormItem>
  );
};

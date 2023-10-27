import React, { FC, useEffect, useState } from 'react';
import { ExecutionPostponedDatePickerProps } from './ExecutionPostponedDatePicker.types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import dayjs from 'dayjs';

export const ExecutionPostponedDatePicker: FC<
  ExecutionPostponedDatePickerProps
> = ({ handleStageChanges }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    const formattedDate = date?.format('YYYY-MM-DD') || null;

    handleStageChanges({ applicationPostponeDate: formattedDate });
  }, [date, handleStageChanges]);

  return (
    <FormItem label="Дата">
      <DatePicker
        allowClear
        placeholder="Выберите дату"
        value={date && dayjs(date)}
        onChange={(date) => setDate(date)}
        format="DD.MM.YYYY"
      />
    </FormItem>
  );
};

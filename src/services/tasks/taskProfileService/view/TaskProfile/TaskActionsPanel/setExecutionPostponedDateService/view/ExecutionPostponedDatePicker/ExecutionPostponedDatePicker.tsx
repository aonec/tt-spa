import React, { FC, useState } from 'react';
import { ExecutionPostponedDatePickerProps } from './ExecutionPostponedDatePicker.types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import dayjs from 'dayjs';

export const ExecutionPostponedDatePicker: FC<
  ExecutionPostponedDatePickerProps
> = ({ handleDateChange }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  const handleChange = (date: dayjs.Dayjs | null) => {
    setDate(date || null);
    const formattedDate = date?.format('YYYY-MM-DD');

    if (formattedDate) handleDateChange(formattedDate);
  };

  return (
    <FormItem label="Дата">
      <DatePicker
        allowClear
        placeholder="Выберите дату"
        value={date && dayjs(date)}
        onChange={(date) => handleChange(date)}
        format="DD.MM.YYYY"
      />
    </FormItem>
  );
};

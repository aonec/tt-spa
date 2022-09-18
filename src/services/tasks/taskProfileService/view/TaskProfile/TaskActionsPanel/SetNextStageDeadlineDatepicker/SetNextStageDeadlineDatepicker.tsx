import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { SetNextStageDeadlineDatepickerProps } from './SetNextStageDeadlineDatepicker.types';

export const SetNextStageDeadlineDatepicker: FC<SetNextStageDeadlineDatepickerProps> = ({
  handleChange,
}) => {
  const [date, setDate] = useState<moment.Moment | null>(null);

  useEffect(() => {
    handleChange({ nextStageDeadline: date?.format('YYYY-MM-DD') });
  }, [date]);

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

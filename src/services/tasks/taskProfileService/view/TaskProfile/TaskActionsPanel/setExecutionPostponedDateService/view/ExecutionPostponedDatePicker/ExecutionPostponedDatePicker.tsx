import React, { FC, useEffect, useState } from 'react';
import { ExecutionPostponedDatePickerProps } from './ExecutionPostponedDatePicker.types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import dayjs from 'dayjs';
import { Comment } from '../../../commentService/view/Comment';

export const ExecutionPostponedDatePicker: FC<
  ExecutionPostponedDatePickerProps
> = ({ handleStageChanges }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [comment, setComment] = useState<string | null>(null);

  useEffect(() => {
    const formattedDate = date?.format('YYYY-MM-DD');

    if (formattedDate)
      handleStageChanges({ applicationPostponeDate: formattedDate, comment });
  }, [date, comment]);

  return (
    <>
      <FormItem label="Дата">
        <DatePicker
          allowClear
          placeholder="Выберите дату"
          value={date && dayjs(date)}
          onChange={(date) => setDate(date)}
          format="DD.MM.YYYY"
        />
      </FormItem>
      <Comment handleCommentChange={setComment} />
    </>
  );
};

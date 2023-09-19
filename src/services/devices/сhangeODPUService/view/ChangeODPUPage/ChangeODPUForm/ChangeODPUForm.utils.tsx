import dayjs from 'api/dayjs';

export const checkIsDateNotFuture = (date: dayjs.Dayjs): boolean => {
  const diff = date.diff(dayjs());

  return diff > 0;
};

export const getDatePickerValue = (
  date?: string | null,
): dayjs.Dayjs | undefined => (date ? dayjs(date) : void 0);

import dayjs from 'api/dayjs';

export const getDatePickerValue = (
  date?: string | null,
): dayjs.Dayjs | null => {
  return date ? dayjs(date) : null;
};

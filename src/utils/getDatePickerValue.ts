import dayjs from 'api/dayjs';

export const getDatePickerValue = (
  date?: string | null,
  format?: dayjs.OptionType,
): dayjs.Dayjs | null => {
  return date ? dayjs(date, format) : null;
};

dayjs().format();

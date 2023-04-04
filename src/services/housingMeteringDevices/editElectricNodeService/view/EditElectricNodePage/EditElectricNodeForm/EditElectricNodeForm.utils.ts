import moment from 'moment';

export const getDatePickerValue = (
  date?: string | null
): moment.Moment | null => {
  return date ? moment(date) : null;
};

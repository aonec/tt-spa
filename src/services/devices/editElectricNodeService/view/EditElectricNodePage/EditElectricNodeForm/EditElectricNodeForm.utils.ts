import moment from 'moment';

export const getDatePickerValue = (
  date?: string | null
): moment.Moment | undefined => {
  return date ? moment(date) : void null;
};

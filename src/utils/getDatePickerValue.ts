import moment from 'moment';

export const getDatePickerValue = (
  date?: string | null,
  format?: moment.MomentFormatSpecification
): moment.Moment | null => {
  return date ? moment(date, format) : null;
};

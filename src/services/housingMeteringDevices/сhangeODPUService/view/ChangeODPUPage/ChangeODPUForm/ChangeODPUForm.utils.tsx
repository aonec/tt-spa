import moment from 'moment';

export const checkIsDateNotFuture = (date: moment.Moment): boolean => {
  const diff = date.diff(moment());

  return diff > 0;
};

export const getDatePickerValue = (
  date?: string | null,
): moment.Moment | undefined => (date ? moment(date) : void 0);

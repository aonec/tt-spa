import { SelectValue } from 'antd/lib/select';
import moment from 'moment';
import { NotRequiredNullableArraySchema } from 'yup';

export const checkIsDateNotFuture = (date: moment.Moment): boolean => {
  const diff = date.diff(moment());

  return diff > 0;
};

export const getDatePickerValue = (
  date?: string | null
): moment.Moment | undefined => (date ? moment(date) : void 0);

import moment from 'moment';

export const getInitialDateFieldValue = (date?: string | null) => {
  if (!date) return null;

  return moment(date);
};

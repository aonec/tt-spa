import moment from 'moment';

export function getDatePeriod(period: 'year' | 'month', date: moment.Moment) {
  const toDate = moment(date).startOf(period);
  const fromDate = moment(date).endOf(period);

  return { From: fromDate.toISOString(true), To: toDate.toISOString(true) };
}

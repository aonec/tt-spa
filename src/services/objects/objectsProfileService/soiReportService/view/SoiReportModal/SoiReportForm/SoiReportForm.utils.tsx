import moment from 'moment';

export function getDatePeriod(period: 'year' | 'month', date: moment.Moment) {
  const fromDate = moment(date).add(-1, period).startOf('month');
  const toDate = moment(date).startOf('month');

  return { From: fromDate.toISOString(), To: toDate.toISOString() };
}


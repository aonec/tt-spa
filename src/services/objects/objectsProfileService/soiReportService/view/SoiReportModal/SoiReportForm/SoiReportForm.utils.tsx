import moment from 'moment';

export function getDatePeriod(period: 'year' | 'month') {
  const toDate = moment();
  const fromDate = moment().add(-1, period);

  return { From: fromDate.toISOString(true), To: toDate.toISOString(true) };
}

import moment from 'moment';

export function getDatePeriod(period: 'year' | 'month', date: moment.Moment) {
  const toDate = moment(date).startOf(period);
  const fromDate = moment(date).endOf(period);

  return { From: fromDate.format("DD.MM.YYYY"), To: toDate.format("DD.MM.YYYY") };
}

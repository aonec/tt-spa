import moment from 'moment';

export const getDate = (date: string, hour: string) =>
  moment(`${date} ${hour}`, 'DD.MM.YYYY HH:00').toISOString();

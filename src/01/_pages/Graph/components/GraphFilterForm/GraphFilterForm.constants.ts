import moment from 'moment';

enum RangeOptions {
  LastDay = 'Последние сутки',
  LastWeek = 'Последние 7 дней',
  ThisMonth = 'С начала месяца',
  LastMonth = 'За прошлый месяц',
}

export const RangePickerExtraOptions = {
  [RangeOptions.LastDay]: [
    moment(),
    moment().set({
      hour: 23,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
  ],
  [RangeOptions.LastWeek]: [
    moment().subtract(1, 'week').set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    moment().set({
      hour: 23,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
  ],
  [RangeOptions.ThisMonth]: [
    moment().startOf('month'),
    moment().set({
      hour: 23,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
  ],
  [RangeOptions.LastMonth]: [
    moment().startOf('month').subtract(1, 'months'),
    moment().subtract(1, 'months').endOf('month'),
  ],
};

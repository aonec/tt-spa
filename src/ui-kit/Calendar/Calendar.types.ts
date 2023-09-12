import dayjs from 'dayjs';

export type CalendarProps = {
  selectedDate: dayjs.Dayjs | null;
  handleSelectDate: (date: dayjs.Dayjs) => void;
  eventDates?: dayjs.Dayjs[];
};

export type CalendarProps = {
  selectedDate: moment.Moment | null;
  handleSelectDate: (date: moment.Moment) => void;
  eventDates?: moment.Moment[];
};

export type GroupReportDatesSelectProps = {
  value: DateRange;
  setValue: (range: DateRange) => void;
};

type DateRange = {
  From?: string;
  To?: string;
};

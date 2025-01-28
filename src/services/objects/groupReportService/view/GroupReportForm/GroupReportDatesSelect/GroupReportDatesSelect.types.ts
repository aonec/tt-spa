export type GroupReportDatesSelectProps = {
  value: DateRange;
  setValue: (range: DateRange) => void;
  isDisabled: boolean;
};

type DateRange = {
  From?: string;
  To?: string;
};

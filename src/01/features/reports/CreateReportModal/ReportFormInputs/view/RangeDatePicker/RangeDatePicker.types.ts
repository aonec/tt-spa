import moment from "moment";

export type RangeDatePickerProps = {
  rangePeriod: [moment.Moment | null, moment.Moment | null] | null;
  onChange: (values: [moment.Moment | null, moment.Moment | null] | null) => void;
};
import { RangePeriod } from '../../../types';

export type RangeDatePickerProps = {
  rangePeriod: RangePeriod;
  onChange: (values: RangePeriod) => void;
};

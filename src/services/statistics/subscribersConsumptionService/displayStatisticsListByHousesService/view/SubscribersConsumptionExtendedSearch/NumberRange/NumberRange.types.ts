export type NumberRangeProps = {
  value: INumberRange;
  onChange: (value: INumberRange) => void;
  disabled?: boolean;
};

type INumberRange = {
  from: number | null;
  to: number | null;
};

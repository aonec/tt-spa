import { EOrderByRule } from 'myApi';

export type SortButtonProps = {
  onChange: (value?: EOrderByRule) => void;
  value?: EOrderByRule;
  className?: string;
};

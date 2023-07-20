import { EOrderByRule } from 'api/myApi';

export type SortButtonProps = {
  onChange: (value?: EOrderByRule) => void;
  value?: EOrderByRule;
  className?: string;
};

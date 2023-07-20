import { EOrderByRule } from 'api/types';

export type SortButtonProps = {
  onChange: (value?: EOrderByRule) => void;
  value?: EOrderByRule;
  className?: string;
};

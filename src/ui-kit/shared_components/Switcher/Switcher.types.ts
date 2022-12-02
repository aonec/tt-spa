export type SwitcherProps<T> = {
  previousValue?: T | null;
  nextValue?: T | null;
  textConstructor: (value: T) => string;
  handleClick: (value: T) => void;
};

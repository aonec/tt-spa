export type NodeStatisticsTableColumnProps<T> = {
  title: string;
  values: (T | undefined)[];
  valueConstructor: (value: T) => string;
};

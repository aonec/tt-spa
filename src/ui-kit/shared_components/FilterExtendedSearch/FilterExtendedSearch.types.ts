export type FilterExtendedSearchProps<T> = {
  handleUpdate: (payload: T[]) => void;
  allowedFilters: SearchFilterType<T>[] | null;
  selectedFilters: T[];
  allowClear?: boolean;
  max?: number;
};

export type SearchFilterType<T> = {
  key: T;
  value: string;
};

export type Filter<T> = {
  selectedFilters: T[];
};

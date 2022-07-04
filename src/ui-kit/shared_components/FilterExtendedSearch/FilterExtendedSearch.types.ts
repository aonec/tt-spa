export type FilterExtendedSearchProps<T> = {
  handleUpdate: (payload: T[]) => void;
  allowedFilters: SearchFilterType<T>[] | null;
};

export type SearchFilterType<T> = {
  key?: T;
  value?: string | null;
};

export type Filter<T> = {
    selectedFilters: T[];
}
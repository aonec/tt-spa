import { useStore } from 'effector-react';
import React from 'react';
import { searchNodeArchiveFilters } from './searchNodeArchiveFiltersService.models';
import { SearchNodeArchiveFilters } from './view/SearchNodeArchiveFilters';

export const SearchNodeArchiveFiltersContainer = () => {
  const loading = useStore(searchNodeArchiveFilters.outputs.$loading);

  return (
    <SearchNodeArchiveFilters
      form={searchNodeArchiveFilters.form}
      loading={loading}
    />
  );
};

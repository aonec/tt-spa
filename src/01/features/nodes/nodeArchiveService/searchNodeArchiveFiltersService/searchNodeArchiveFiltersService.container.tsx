import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { searchNodeArchiveFilters } from './searchNodeArchiveFiltersService.models';
import { SearchNodeArchiveFilters } from './view/SearchNodeArchiveFilters';

export const SearchNodeArchiveFiltersContainer = () => {
  const loading = useStore(searchNodeArchiveFilters.outputs.$loading);
  const handleSubmit = useEvent(searchNodeArchiveFilters.inputs.applyFilters);

  return (
    <SearchNodeArchiveFilters
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

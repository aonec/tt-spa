import { useUnit } from 'effector-react';
import React from 'react';
import { searchNodeArchiveFilters } from './searchNodeArchiveFiltersService.models';
import { SearchNodeArchiveFilters } from './view/SearchNodeArchiveFilters';
import './searchNodeArchiveFiltersService.relations';

export const SearchNodeArchiveFiltersContainer = () => {
  const { handleSubmit, loading } = useUnit({
    loading: searchNodeArchiveFilters.outputs.$loading,
    handleSubmit: searchNodeArchiveFilters.inputs.applyFilters,
  });

  return (
    <SearchNodeArchiveFilters handleSubmit={handleSubmit} loading={loading} />
  );
};

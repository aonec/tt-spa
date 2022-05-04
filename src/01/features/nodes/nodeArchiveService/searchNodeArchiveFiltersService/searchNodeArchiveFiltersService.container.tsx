import React from 'react';
import { searchNodeArchiveFilters } from './searchNodeArchiveFiltersService.models';
import { SearchNodeArchiveFilters } from './view/SearchNodeArchiveFilters';

export const SearchNodeArchiveFiltersContainer = () => {
  return <SearchNodeArchiveFilters form={searchNodeArchiveFilters.form} />;
};

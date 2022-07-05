import { FilterButton } from '01/features/actsJournal/displayActsJournal/components/filterButton/FIlterButton';
import React, { useCallback } from 'react';
import { CheckboxSC } from './FilterExtendedSearch.styled';
import {
  FilterExtendedSearchProps,
  SearchFilterType,
} from './FilterExtendedSearch.types';

export function FilterExtendedSearch<T>({
  handleUpdate,
  selectedFilters,
  allowedFilters,
}: FilterExtendedSearchProps<T>) {
  const handleFilterClick = useCallback(
    (filterField: SearchFilterType<T>, checked: boolean) =>
      handleUpdate(
        checked
          ? selectedFilters?.filter((type) => type !== filterField.key)
          : [...(selectedFilters || []), filterField.key!]
      ),
    [selectedFilters, allowedFilters]
  );

  return (
    <FilterButton
      onClear={() => handleUpdate([])}
      active={Boolean(selectedFilters?.length)}
    >
      {allowedFilters &&
        allowedFilters.map((filterField) => {
          const checked = selectedFilters?.includes(filterField.key!);
          return (
            <div>
              <CheckboxSC
                checked={checked}
                onClick={() => handleFilterClick(filterField, checked)}
              >
                {filterField.value}
              </CheckboxSC>
            </div>
          );
        })}
    </FilterButton>
  );
}

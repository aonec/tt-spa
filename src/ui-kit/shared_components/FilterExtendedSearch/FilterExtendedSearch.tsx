import { FilterButton } from 'ui-kit/shared_components/filterButton/FIlterButton';
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
  allowClear = true,
  max = Infinity,
}: FilterExtendedSearchProps<T>) {
  const isMax = selectedFilters.length >= max;

  const handleFilterClick = useCallback(
    (clickPayload: { filterField: SearchFilterType<T>; checked: boolean }) =>
      handleUpdate(
        clickPayload.checked
          ? selectedFilters?.filter(
              (type) => type !== clickPayload.filterField.key,
            )
          : [
              ...(isMax
                ? selectedFilters.slice(0, selectedFilters.length - 1)
                : selectedFilters || []),
              clickPayload.filterField.key,
            ],
      ),
    [selectedFilters, handleUpdate, isMax],
  );
  const handleClearFilter = useCallback(() => handleUpdate([]), [handleUpdate]);

  return (
    <FilterButton
      onClear={handleClearFilter}
      active={Boolean(selectedFilters?.length)}
      allowClear={allowClear}
    >
      {allowedFilters &&
        allowedFilters.map((filterField) => {
          const checked = selectedFilters?.includes(filterField.key);

          return (
            <div key={filterField.value}>
              <CheckboxSC
                checked={checked}
                onClick={() => handleFilterClick({ filterField, checked })}
              >
                {filterField.value}
              </CheckboxSC>
            </div>
          );
        })}
    </FilterButton>
  );
}

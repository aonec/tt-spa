import { useCallback, useEffect } from 'react';
import { FilterButton } from '../../../01/features/actsJournal/displayActsJournal/components/filterButton/FIlterButton';
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
    (clickPayload: { filterField: SearchFilterType<T>; checked: boolean }) =>
      handleUpdate(
        clickPayload.checked
          ? selectedFilters?.filter(
              (type) => type !== clickPayload.filterField.key
            )
          : [...(selectedFilters || []), clickPayload.filterField.key!]
      ),
    [handleUpdate, selectedFilters]
  );
  const handleClearFilter = useCallback(() => handleUpdate([]), [handleUpdate]);

    useEffect(() => handleClearFilter, []);
  return (
    <FilterButton
      onClear={handleClearFilter}
      active={Boolean(selectedFilters?.length)}
    >
      {allowedFilters &&
        allowedFilters.map((filterField) => {
          const checked = selectedFilters?.includes(filterField.key!);
          return (
            <div>
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

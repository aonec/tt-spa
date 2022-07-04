import { FilterButton } from '01/features/actsJournal/displayActsJournal/components/filterButton/FIlterButton';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { CheckboxSC } from './FilterExtendedSearch.styled';
import {
  Filter,
  FilterExtendedSearchProps,
} from './FilterExtendedSearch.types';

export function FilterExtendedSearch<T>({
  handleUpdate,
  allowedFilters,
}: FilterExtendedSearchProps<T>) {
  const { values, handleSubmit, setFieldValue } = useFormik<Filter<T>>({
    initialValues: {
      selectedFilters: [],
    },
    onSubmit: ({ selectedFilters }) => handleUpdate(selectedFilters),
  });

  useEffect(() => {
    handleSubmit();
  }, [values.selectedFilters]);

  return (
    <FilterButton
      onClear={() => setFieldValue('selectedFilters', [])}
      active={Boolean(values.selectedFilters.length)}
    >
      {allowedFilters &&
        allowedFilters.map((filterField) => {
          const checked = values.selectedFilters?.includes(filterField.key!);

          return (
            <div>
              <CheckboxSC
                checked={checked}
                onClick={() =>
                  setFieldValue(
                    'selectedFilters',
                    checked
                      ? values.selectedFilters!.filter(
                          (type) => type !== filterField.key
                        )
                      : [...(values.selectedFilters || []), filterField.key]
                  )
                }
              >{`${filterField.value}`}</CheckboxSC>{' '}
            </div>
          );
        })}
    </FilterButton>
  );
}

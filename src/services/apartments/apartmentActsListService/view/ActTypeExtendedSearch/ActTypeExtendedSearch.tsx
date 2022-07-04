import { FilterButton } from '01/features/actsJournal/displayActsJournal/components/filterButton/FIlterButton';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import { CheckboxSC } from './ActTypeExtendedSearch.styled';
import {
  ActTypeExtendedSearchProps,
  TypesFilter,
} from './ActTypeExtendedSearch.types';

export const ActTypeExtendedSearch: FC<ActTypeExtendedSearchProps> = ({
  actTypes,
  handleUpdateTypes,
}) => {
  const { values, setFieldValue, handleSubmit } = useFormik<TypesFilter>({
    initialValues: {
      allowedActTypes: [],
    },
    onSubmit: (filter) => handleUpdateTypes(filter.allowedActTypes),
  });

  useEffect(() => {
    handleSubmit();
  }, [values.allowedActTypes]);

  return (
    <FilterButton
      onClear={() => setFieldValue('allowedActTypes', [])}
      active={Boolean(values.allowedActTypes.length)}
    >
      {actTypes &&
        actTypes.map((actType) => {
          const checked = values.allowedActTypes?.includes(actType.key!);

          return (
            <div>
              <CheckboxSC
                checked={checked}
                onClick={() =>
                  setFieldValue(
                    'allowedActTypes',
                    checked
                      ? values.allowedActTypes!.filter(
                          (type) => type !== actType.key
                        )
                      : [...(values.allowedActTypes || []), actType.key]
                  )
                }
              >{`${actType.value}`}</CheckboxSC>{' '}
            </div>
          );
        })}
    </FilterButton>
  );
};

import { FilterButton } from '01/features/actsJournal/displayActsJournal/components/filterButton/FIlterButton';
import { useFormik } from 'formik';
import { EActResourceType } from 'myApi';
import React, { FC, useEffect } from 'react';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { CheckboxSC } from './ResourceExtendedSearch.styled';
import {
  ResourceExtendedSearchProps,
  ResourcesFilter,
} from './ResourceExtendedSearch.types';

export const ResourceExtendedSearch: FC<ResourceExtendedSearchProps> = ({
  handleUpdateResources,
}) => {
  const { values, handleSubmit, setFieldValue } = useFormik<ResourcesFilter>({
    initialValues: {
      allowedActResources: [],
    },
    onSubmit: (filter) => handleUpdateResources(filter.allowedActResources),
  });

  const resources = Object.entries(
    actResourceNamesLookup
  ).map(([key, value]) => ({ key: key as EActResourceType, value }));

  useEffect(() => {
    handleSubmit();
  }, [values.allowedActResources]);

  return (
    <FilterButton
      onClear={() => setFieldValue('allowedActResources', [])}
      active={Boolean(values.allowedActResources.length)}
    >
      {resources &&
        resources.map((resource) => {
          const checked = values.allowedActResources?.includes(resource.key!);

          return (
            <div>
              <CheckboxSC
                checked={checked}
                onClick={() =>
                  setFieldValue(
                    'allowedActResources',
                    checked
                      ? values.allowedActResources!.filter(
                          (type) => type !== resource.key
                        )
                      : [...(values.allowedActResources || []), resource.key]
                  )
                }
              >{`${resource.value}`}</CheckboxSC>{' '}
            </div>
          );
        })}
    </FilterButton>
  );
};

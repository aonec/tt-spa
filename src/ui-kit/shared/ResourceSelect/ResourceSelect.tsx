import { EResourceType } from 'api/types';
import React, { FC } from 'react';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from '../ResourceIconLookup';
import { resourcesNamesLookup } from './ResourceSelect.constants';
import { OptionWrapper } from './ResourceSelect.styled';
import { ResourceSelectProps } from './ResourceSelect.types';

export const ResourceSelect: FC<ResourceSelectProps> = ({
  resource: selectedResource,
  exclude = [],
  disabled,
  onChange,
  small = false,
}) => {
  const resources = Object.values(EResourceType).filter(
    (resource) => !exclude.includes(resource),
  );

  return (
    <Select
      small={small}
      value={selectedResource || undefined}
      onChange={(value) =>
        onChange && onChange((value || null) as EResourceType | null)
      }
      disabled={disabled}
      placeholder="Выберите"
    >
      {resources.map((resource) => (
        <Select.Option key={resource} value={resource}>
          <OptionWrapper>
            <ResourceIconLookup resource={resource} />
            <div>{resourcesNamesLookup[resource]}</div>
          </OptionWrapper>
        </Select.Option>
      ))}
    </Select>
  );
};

import React, { FC } from 'react';
import { OptionWrapper } from './ResourceSelectSC.styled';
import { ResourceSelectSCProps } from './ResourceSelectSC.types';
import { EResourceType } from 'myApi';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from '../ResourceIconLookup';
import { resourcesNamesLookup } from '../ResourceSelect/ResourceSelect.constants';

export const ResourceSelectSC: FC<ResourceSelectSCProps> = ({
  resource: selectedResource,
  exclude = [],
  disabled,
  onChange,
}) => {
  const resources = Object.values(EResourceType).filter(
    (resource) => !exclude.includes(resource),
  );

  return (
    <Select
      search
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

import { EResourceType } from 'api/types';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { resourceNamesLookup } from './ResourceSelect.constants';
import { ResourceSelectProps } from './ResourceSelect.types';

export const ResourceSelect: FC<ResourceSelectProps> = ({
  onChange,
  resources,
}) => {
  return (
    <FormItem label="Ресурс">
      <Select
        value={resources}
        onChange={(resources) => {
          onChange([...(resources as EResourceType[])]);
        }}
        placeholder="Выберите из списка"
        mode="multiple"
      >
        {Object.entries(resourceNamesLookup).map(([key, value]) => (
          <Select.Option key={key} value={key}>
            {value}
          </Select.Option>
        ))}
      </Select>
    </FormItem>
  );
};

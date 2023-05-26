import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { ItemPanelsSelect } from '.';
import { ResourceIconLookup } from '../ResourceIconLookup';
import { EResourceType } from 'myApi';
import { ResourceMapNamesDictionary } from 'dictionaries';

export default {
  title: 'ItemPanelsSelect',
  component: ItemPanelsSelect,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof ItemPanelsSelect>;

export const Overview = () => {
  const [resourceTypes, setResourceTypes] = useState<EResourceType[]>([]);

  const baseResourceOptions = [
    EResourceType.ColdWaterSupply,
    EResourceType.HotWaterSupply,
    EResourceType.Heat,
    EResourceType.Electricity,
  ].map((resource) => ({
    key: resource,
    icon: <ResourceIconLookup resource={resource} />,
    title: ResourceMapNamesDictionary[resource],
  }));

  return (
    <ItemPanelsSelect
      items={baseResourceOptions}
      selected={resourceTypes}
      onChange={(value) => setResourceTypes([value || []].flat())}
    />
  );
};

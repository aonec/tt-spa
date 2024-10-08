import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { ItemPanelsSelect } from '.';
import { ResourceIconLookup } from '../ResourceIconLookup';
import { EResourceType } from 'api/types';
import { ResourceMapNamesDictionary } from 'dictionaries';

export default {
  title: 'ItemPanelsSelect',
  component: ItemPanelsSelect,
  parameters: { layout: 'centered' },
} as Meta<typeof ItemPanelsSelect>;

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

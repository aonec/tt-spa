import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ResourceSelectSC } from '.';
import { EResourceType } from 'api/types';
import { FormItem } from 'ui-kit/FormItem';

export default {
  title: 'ResourceSelect',
  component: ResourceSelectSC,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof ResourceSelectSC>;

export const Search: ComponentStory<typeof ResourceSelectSC> = () => {
  const [resource, setResource] = useState<EResourceType | null>(null);

  return (
    <div style={{ width: 300 }}>
      <FormItem>
        <ResourceSelectSC resource={resource} onChange={setResource} />
      </FormItem>
    </div>
  );
};

import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ResourceSelect } from '.';
import { EResourceType } from 'api/types';
import { FormItem } from 'ui-kit/FormItem';
import { ResourceSelectSC } from '../ResourceSelectSC';

export default {
  title: 'ResourceSelect',
  component: ResourceSelectSC,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof ResourceSelectSC>;

export const Form: ComponentStory<typeof ResourceSelect> = () => {
  const [resource, setResource] = useState<EResourceType | null>(null);

  return (
    <div style={{ width: 300 }}>
      <FormItem>
        <ResourceSelect resource={resource} onChange={setResource} />
      </FormItem>
    </div>
  );
};

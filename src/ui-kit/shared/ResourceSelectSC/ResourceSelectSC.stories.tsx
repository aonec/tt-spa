import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { ResourceSelectSC } from '.';
import { EResourceType } from 'api/types';
import { FormItem } from 'ui-kit/FormItem';

export default {
  title: 'ResourceSelect',
  component: ResourceSelectSC,
  parameters: { layout: 'centered' },
} as Meta<typeof ResourceSelectSC>;

export const Search = () => {
  const [resource, setResource] = useState<EResourceType | null>(null);

  return (
    <div style={{ width: 300 }}>
      <FormItem>
        <ResourceSelectSC resource={resource} onChange={setResource} />
      </FormItem>
    </div>
  );
};

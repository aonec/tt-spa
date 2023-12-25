import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SelectMultiple } from '.';
import { EResourceType } from 'api/types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'dictionaries';
import { ResourceOption } from './SelectMultiple.story.styled';

const meta: Meta<typeof SelectMultiple> = {
  title: 'SelectMultiple',
  component: SelectMultiple,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: StoryObj<typeof SelectMultiple> = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <SelectMultiple {...args} />
    </div>
  ),
  args: {
    placeholder: 'Выберите',
    children: (
      <>
        {Object.values(EResourceType).map((resource) => (
          <SelectMultiple.Option key={resource} value={resource}>
            <ResourceOption>
              <ResourceIconLookup resource={resource} />
              <div>{ResourceShortNamesDictionary[resource]}</div>
            </ResourceOption>
          </SelectMultiple.Option>
        ))}
      </>
    ),
    style: { width: '100%' },
  },
};

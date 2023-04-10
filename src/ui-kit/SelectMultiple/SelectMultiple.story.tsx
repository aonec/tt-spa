import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SelectMultiple } from '.';
import { EResourceType } from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'dictionaries';
import { ResourceOption } from './SelectMultiple.styled.story';

const meta: ComponentMeta<typeof SelectMultiple> = {
  title: 'SelectMultiple',
  component: SelectMultiple,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof SelectMultiple> = (args) => (
  <div style={{ width: '300px' }}>
    <SelectMultiple {...args} />
  </div>
);

Overview.args = {
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
};

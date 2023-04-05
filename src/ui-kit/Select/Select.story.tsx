import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select.styled';

const meta: ComponentMeta<typeof Select> = {
  title: 'Select',
  component: Select,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof Select> = (args) => (
  <div style={{ width: '300px' }}>
    <Select {...args} />
  </div>
);

Overview.args = {
  children: (
    <>
      <Select.Option key={1} value={1}>
        Один тариф
      </Select.Option>{' '}
      <Select.Option key={2} value={2}>
        Два тарифа
      </Select.Option>
      <Select.Option key={3} value={3}>
        Три тарифа
      </Select.Option>
    </>
  ),
  placeholder: 'Выберите тариф',
  style: { width: '100%' },
};

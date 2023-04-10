import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from 'ui-kit/Input';
import { FormItem } from '.';

const meta: ComponentMeta<typeof FormItem> = {
  title: 'FormItem',
  component: FormItem,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof FormItem> = (args) => (
  <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
    <FormItem {...args}>
      <Input placeholder="Введите серийный номер" />
    </FormItem>
  </div>
);

Overview.args = {
  label: 'Cерийный номер',
  style: {
    width: '100%',
  },
};

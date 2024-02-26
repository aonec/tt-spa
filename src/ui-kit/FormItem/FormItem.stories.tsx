import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from 'ui-kit/Input';
import { FormItem } from '.';

const meta: Meta<typeof FormItem> = {
  title: 'FormItem',
  component: FormItem,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: StoryObj<typeof FormItem> = {
  render: (args) => (
    <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
      <FormItem {...args}>
        <Input placeholder="Введите серийный номер" />
      </FormItem>
    </div>
  ),
  args: {
    label: 'Cерийный номер',
    style: {
      width: '100%',
    },
  },
};

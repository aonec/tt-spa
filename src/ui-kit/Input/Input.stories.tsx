import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input.styled';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: StoryObj<typeof Input> = {
  render: (args) => (
    <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
      <Input {...args} />
    </div>
  ),
  args: {
    placeholder: 'Введите серийный номер',
  },
};

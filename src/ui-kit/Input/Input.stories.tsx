import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './Input.styled';

const meta: ComponentMeta<typeof Input> = {
  title: 'Input',
  component: Input,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof Input> = (args) => (
  <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
    <Input {...args} />
  </div>
);

Overview.args = {
  placeholder: 'Введите серийный номер',
};

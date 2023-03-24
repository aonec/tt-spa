import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    floating: {
      description: 'Устанавливает width = 100%',
    },
    long: {
      description: 'Добавляет дополнительный padding = 20px слева и справа',
    },
    size: {
      defaultValue: 'middle',
    },
    type: {
      defaultValue: 'default',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = { type: 'primary' };

export const Danger = Template.bind({});
Danger.args = { type: 'danger' };

export const Ghost = Template.bind({});
Ghost.args = { type: 'ghost' };

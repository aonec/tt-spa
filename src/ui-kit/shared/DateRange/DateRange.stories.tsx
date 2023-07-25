import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DateRange } from '.';

export default {
  title: 'DateRange',
  component: DateRange,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof DateRange>;

export const Overview: ComponentStory<typeof DateRange> = (args) => (
  <DateRange {...args} />
);
Overview.args = {
  firstDate: '2023-04-10',
  lastDate: '2023-06-10',
};

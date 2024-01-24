import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DateRange } from '.';

export default {
  title: 'DateRange',
  component: DateRange,
  parameters: { layout: 'centered' },
} as Meta<typeof DateRange>;

export const Overview: StoryObj<typeof DateRange> = {
  render: (args) => <DateRange {...args} />,
  args: {
    firstDate: '2023-04-10',
    lastDate: '2023-06-10',
  },
};

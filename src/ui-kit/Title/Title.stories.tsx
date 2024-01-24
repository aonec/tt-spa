import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';
import { HotWaterSupplyIcon } from 'ui-kit/icons';

const meta: Meta<typeof Title> = {
  title: 'Title',
  component: Title,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Overview: Story = {
  render: (args) => (
    <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
      <Title {...args} />
    </div>
  ),
  args: {
    children: 'Приборы',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
      <Title {...args} />
    </div>
  ),
  args: {
    icon: <HotWaterSupplyIcon />,
    children: 'Узел 3',
  },
};

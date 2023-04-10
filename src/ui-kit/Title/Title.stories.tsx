import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Title } from './Title';
import { HotWaterSupplyIcon } from 'ui-kit/icons';

const meta: ComponentMeta<typeof Title> = {
  title: 'Title',
  component: Title,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof Title> = (args) => (
  <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
    <Title {...args} />
  </div>
);

Overview.args = {
  children: 'Приборы',
};

export const WithIcon: ComponentStory<typeof Title> = (args) => (
  <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
    <Title {...args} />
  </div>
);

WithIcon.args = {
  icon: <HotWaterSupplyIcon />,
  children: 'Узел 3',
};

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommonInfo } from '.';
import { PersonIcon } from 'ui-kit/icons';

export default {
  title: 'CommonInfo',
  component: CommonInfo,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof CommonInfo>;

export const Overview: ComponentStory<typeof CommonInfo> = (args) => (
  <div style={{ width: 800 }}>
    <CommonInfo {...args} />
  </div>
);
Overview.args = {
  items: [
    {
      key: 'Строка',
      value: 'Значение',
    },
    {
      key: 'Еще одна строка',
      value: (
        <>
          <PersonIcon /> ReactNode
        </>
      ),
    },
  ],
};

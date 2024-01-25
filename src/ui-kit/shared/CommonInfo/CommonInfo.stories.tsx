import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CommonInfo } from '.';
import { PersonIcon } from 'ui-kit/icons';

export default {
  title: 'CommonInfo',
  component: CommonInfo,
  parameters: { layout: 'centered' },
} as Meta<typeof CommonInfo>;

export const Overview: StoryObj<typeof CommonInfo> = {
  render: (args) => (
    <div style={{ width: 800 }}>
      <CommonInfo {...args} />
    </div>
  ),
  args: {
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
  },
};

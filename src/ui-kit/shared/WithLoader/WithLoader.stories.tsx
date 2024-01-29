import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { WithLoader } from '.';
import { Wrapper } from './WithLoader.stories.styled';

export default {
  title: 'WithLoader',
  component: WithLoader,
  parameters: { layout: 'centered' },
} as Meta<typeof WithLoader>;

export const Overview: StoryObj<typeof WithLoader> = {
  render: (args) => (
    <Wrapper>
      <WithLoader {...args}>Children </WithLoader>
    </Wrapper>
  ),
  args: {
    isLoading: true,
  },
};

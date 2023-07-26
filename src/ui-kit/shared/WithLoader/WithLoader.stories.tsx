import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WithLoader } from '.';
import { Wrapper } from './WithLoader.styled.stories';

export default {
  title: 'WithLoader',
  component: WithLoader,
  parameters: { layout: 'centered' },
  argTypes: {
    isLoading: {
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof WithLoader>;

export const Overview: ComponentStory<typeof WithLoader> = (args) => (
  <Wrapper>
    <WithLoader {...args}>Children </WithLoader>
  </Wrapper>
);

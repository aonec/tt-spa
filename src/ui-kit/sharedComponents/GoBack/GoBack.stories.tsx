import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { GoBack } from '.';

export default {
  title: 'GoBack',
  component: GoBack,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof GoBack>;

export const WithoutPath = () => <GoBack />;

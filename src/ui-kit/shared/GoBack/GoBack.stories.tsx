import React from 'react';
import { Meta } from '@storybook/react';
import { GoBack } from '.';

export default {
  title: 'GoBack',
  component: GoBack,
  parameters: { layout: 'centered' },
} as Meta<typeof GoBack>;

export const WithoutPath = () => <GoBack />;

import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Loader } from './Loader';

const meta: ComponentMeta<typeof Loader> = {
  title: 'Loader',
  component: Loader,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview = () => <Loader show size={36} />;

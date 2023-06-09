import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { TypeAddressToStart } from '.';

export default {
  title: 'TypeAddressToStart',
  component: TypeAddressToStart,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof TypeAddressToStart>;

export const Overview = () => <TypeAddressToStart />;

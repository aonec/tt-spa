import React from 'react';
import { Meta } from '@storybook/react';
import { TypeAddressToStart } from '.';

export default {
  title: 'TypeAddressToStart',
  component: TypeAddressToStart,
  parameters: { layout: 'centered' },
} as Meta<typeof TypeAddressToStart>;

export const Overview = () => <TypeAddressToStart />;

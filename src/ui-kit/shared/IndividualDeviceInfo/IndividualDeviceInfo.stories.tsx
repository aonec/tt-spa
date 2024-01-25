import React from 'react';
import { Meta } from '@storybook/react';
import { IndividualDeviceInfo } from '.';
import { Device } from './IndividualDeviceInfo.stories.constants';

export default {
  title: 'IndividualDeviceInfo',
  component: IndividualDeviceInfo,
  parameters: { layout: 'centered' },
} as Meta<typeof IndividualDeviceInfo>;

export const Standart = () => <IndividualDeviceInfo device={Device} />;

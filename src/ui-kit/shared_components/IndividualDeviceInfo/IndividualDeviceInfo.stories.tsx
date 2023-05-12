import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { IndividualDeviceInfo } from '.';
import { Device } from './IndividualDeviceInfo.constants.stories';

export default {
  title: 'IndividualDeviceInfo',
  component: IndividualDeviceInfo,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof IndividualDeviceInfo>;

export const Standart = () => <IndividualDeviceInfo device={Device} />;

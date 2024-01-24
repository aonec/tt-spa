import React from 'react';
import { Meta } from '@storybook/react';
import { IndividualDeviceInfoShort } from '.';
import { Device } from '../IndividualDeviceInfo/IndividualDeviceInfo.stories.constants';

export default {
  title: 'IndividualDeviceInfo',
  component: IndividualDeviceInfoShort,
  parameters: { layout: 'centered' },
} as Meta<typeof IndividualDeviceInfoShort>;

export const Short = () => <IndividualDeviceInfoShort device={Device} />;

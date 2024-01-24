import React from 'react';
import { Meta } from '@storybook/react';
import { IndividualDeviceInfoExtended } from '.';
import { Device } from '../IndividualDeviceInfo/IndividualDeviceInfo.stories.constants';

export default {
  title: 'IndividualDeviceInfo',
  component: IndividualDeviceInfoExtended,
  parameters: { layout: 'centered' },
} as Meta<typeof IndividualDeviceInfoExtended>;

export const Extended = () => <IndividualDeviceInfoExtended device={Device} />;

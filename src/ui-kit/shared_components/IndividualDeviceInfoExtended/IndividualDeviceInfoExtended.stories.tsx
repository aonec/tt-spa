import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { IndividualDeviceInfoExtended } from '.';
import { Device } from '../IndividualDeviceInfo/IndividualDeviceInfo.constants.stories';

export default {
  title: 'IndividualDeviceInfo',
  component: IndividualDeviceInfoExtended,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof IndividualDeviceInfoExtended>;

export const Extended = () => <IndividualDeviceInfoExtended device={Device} />;

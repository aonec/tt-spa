import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { IndividualDeviceInfoShort } from '.';
import { Device } from '../IndividualDeviceInfo/IndividualDeviceInfo.constants.stories';

export default {
  title: 'IndividualDeviceInfo',
  component: IndividualDeviceInfoShort,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof IndividualDeviceInfoShort>;

export const Short = () => <IndividualDeviceInfoShort device={Device} />;

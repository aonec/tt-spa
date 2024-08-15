import React from 'react';
import { Meta } from '@storybook/react';
import { IndividualDeviceInfoShort } from '.';
import { Device } from '../IndividualDeviceInfo/IndividualDeviceInfo.stories.constants';

const meta: Meta<typeof IndividualDeviceInfoShort> = {
  title: 'IndividualDeviceInfoShort',
  component: IndividualDeviceInfoShort,
  parameters: { layout: 'centered' },
};

export default meta;

export const Short = () => <IndividualDeviceInfoShort device={Device} />;

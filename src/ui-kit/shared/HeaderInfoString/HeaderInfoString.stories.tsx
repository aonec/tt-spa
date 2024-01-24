import React from 'react';
import { Meta } from '@storybook/react';
import { HeaderInfoString } from '.';
import { DeviceStatus } from '../IndividualDeviceInfo/DeviceStatus';

export default {
  title: 'HeaderInfoString',
  component: HeaderInfoString,
  parameters: { layout: 'centered' },
} as Meta<typeof HeaderInfoString>;

export const Overview = () => (
  <HeaderInfoString>
    <div>Нижнекамск</div>
    <>Узел 2</>
    <DeviceStatus isActive={true} />
  </HeaderInfoString>
);

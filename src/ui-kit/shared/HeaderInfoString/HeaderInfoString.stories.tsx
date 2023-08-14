import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { HeaderInfoString } from '.';
import { DeviceStatus } from '../IndividualDeviceInfo/DeviceStatus';

export default {
  title: 'HeaderInfoString',
  component: HeaderInfoString,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof HeaderInfoString>;

export const Overview = () => (
  <HeaderInfoString>
    <div>Нижнекамск</div>
    <>Узел 2</>
    <DeviceStatus isActive={true} />
  </HeaderInfoString>
);

/* eslint-disable */

import React from 'react';

import { Icon } from '01/components/Icon';

export const Device = ({
  styles,
  device: { resource, serialNumber, model } = {},
  ...props
}) => {
  if (!model) return null;
  return (
    <device {...props}>
      <Icon {...getDeviceIconProps(resource)} />
      {model} ({serialNumber})
    </device>
  );
};

Device.defaultProps = {
  styles: {},
};

function getDeviceIconProps(resource) {
  const dev = 'var(--main-80)';
  const cold = 'var(--cold-water)';
  const hot = 'var(--hot-water)';
  switch (resource) {
    case 'ColdWaterSupply':
      return { icon: 'water', fill: cold };
    case 'HotWaterSupply':
      return { icon: 'water', fill: hot };
    case 'Heat':
      return { icon: 'heat', fill: dev };
    default:
      return { icon: 'device', fill: dev };
  }
}

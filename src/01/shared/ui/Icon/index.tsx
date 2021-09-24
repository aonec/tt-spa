import React from 'react';
import DeviceIcons from '01/_components/DeviceIcons';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';

interface Props {
  name: string;
}

export const Icon: React.FC<Props> = ({ name }) => {
  const { icon, color } = DeviceIcons[name] || {};

  return <StockIconTT icon={icon} color={color} dark />;
};

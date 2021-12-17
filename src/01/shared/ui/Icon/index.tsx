import React from 'react';
import DeviceIcons from '01/_components/DeviceIcons';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';

interface Props {
  name: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<Props> = ({ name, style }) => {
  const { icon, color } = DeviceIcons[name] || {};

  return (
    <div style={style}>
      <StockIconTT icon={icon} color={color} dark />
    </div>
  );
};

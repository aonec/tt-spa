import React from 'react';
import styledReshadow from 'reshadow/macro';
import icons from '01/assets/icons.json';
import styled from 'styled-components';
import { ReactComponent as WaterIcon } from './icons/water.svg';
import { ReactComponent as HeatIcon } from './icons/heat.svg';
import { ReactComponent as ElectroIcon } from './icons/electro.svg';

const darkIcons = {
  water: WaterIcon,
  heat: HeatIcon,
  electro: ElectroIcon,
};

export const Icon = ({ size = 16, icon = '', dark = false, ...props }) => {
  const DarkIcon = darkIcons[props.fill === '#FF8C68' ? 'heat' : icon];

  if (DarkIcon && dark) {
    const Icon = styled(DarkIcon)`
      width: ${() => size}px;
      height: ${() => size}px;
    `;

    return <Icon />;
  }

  return styledReshadow()`
    svg {
      width: ${`${size}px`};
      height: ${`${size}px`};
    }
  `(
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path as="path" clipRule="evenodd" fillRule="evenodd" d={icons[icon]} />
    </svg>
  );
};
export default Icon;

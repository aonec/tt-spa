import React from 'react';
import styledReshadow from 'reshadow/macro';
import icons from '../../assets/icons.json';
import { darkIcons } from '01/_components/Icon/Icon';
import styled from 'styled-components';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';

export const Icon = ({ size = 16, icon = '', dark = false, ...props }) => {
  const DarkIcon = darkIcons[props.fill === '#FF8C68' ? 'heat' : icon];

  if (DarkIcon && dark) {
    const Icon = styled(DarkIcon)`
      width: ${() => size}px;
      height: ${() => size}px;
    `;

    return (
      <Flex style={{ transform: 'translateY(2px)' }}>
        <Space>
          <Icon />
        </Space>
      </Flex>
    );
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

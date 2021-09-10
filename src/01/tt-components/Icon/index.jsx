import React from 'react';
import icons from '../../assets/icons.json';
import { darkIcons } from '01/_components/Icon/Icon';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';

export const Icon = ({ size = 16, icon = '', dark = false, ...props }) => {
  const DarkIcon = darkIcons[icon];

  if (DarkIcon && dark && icon !== 'Heat') {
    return (
      <Flex style={{ transform: 'translateY(2px)' }}>
        <Space>
          <DarkIcon />
        </Space>
      </Flex>
    );
  }

  return (
    <Flex style={{ transform: 'translateY(2px)', marginRight: -7 }}>
      <Space>
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          {...props}
          width={size}
          height={size}
        >
          <path
            as="path"
            clipRule="evenodd"
            fillRule="evenodd"
            d={icons[icon]}
          />
        </svg>
      </Space>
    </Flex>
  );
};

export default Icon;

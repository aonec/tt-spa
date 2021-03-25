import React from 'react';

import icons from './icons.json';

export const IconTT = (props) => {
  const { icon = 'device', size = 16, stroke, hover, style } = props;

  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <path
        as="path"
        clipRule="evenodd"
        fillRule="evenodd"
        d={icons[icon].path}
        fill={icons[icon].fill}
        stroke={icons[icon].stroke}
      />
    </svg>
  );
};
export default IconTT;

import React from 'react';
import t from 'prop-types';

import icons from './icons.json';

export const IconTT = (props) => {
  const { icon, size = 16 } = props;
  console.log('Icon');
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width={size + 'px'} height={size + 'px'} {...props}>
      <path as="path" clipRule="evenodd" fillRule="evenodd" d={icons[icon].path} fill={icons[icon].fill}/>
    </svg>
  );
};
export default IconTT;

IconTT.propTypes = {
  icon: t.oneOf([...Object.keys(icons).sort((a, b) => a.localeCompare(b))])
    .isRequired,
  size: t.number,
};

import React from 'react';
import t from 'prop-types';
import icons from '01/assets/icons.json';
import { IconWrapper } from './Icon.styled';

export const Icon = ({ size = 16, icon = '', ...props }) => {
  return (
    <IconWrapper size={size}>
      <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path as="path" clipRule="evenodd" fillRule="evenodd" d={icons[icon]} />
      </svg>
    </IconWrapper>
  );
};

Icon.propTypes = {
  icon: t.oneOf([...Object.keys(icons).sort((a, b) => a.localeCompare(b))])
    .isRequired,
  size: t.string,
  fill: t.string,
};

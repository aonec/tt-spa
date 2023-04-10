import * as Icons from './';
import React from 'react';
import { IconsList, IconWrapper } from './Icons.styled';

export default {
  title: 'Icons',
};

export const All = () => (
  <IconsList>
    {Object.entries(Icons).map(([name, Icon]) => (
      <IconWrapper>
        <div>
          <Icon />
        </div>
        - {name}
      </IconWrapper>
    ))}
  </IconsList>
);

import * as Icons from './';
import React from 'react';

export default {
  title: 'Icons',
};

export const All = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: 12,
    }}
  >
    {Object.entries(Icons).map(([name, Icon]) => (
      <div>
        <Icon /> - {name}
      </div>
    ))}
  </div>
);

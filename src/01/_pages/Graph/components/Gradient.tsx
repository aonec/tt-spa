import { EResourceType } from 'myApi';
import React, { CSSProperties } from 'react';
import { GraphColorLookup } from 'utils/Graph.utils';

interface Props {
  resource: EResourceType;
  style?: CSSProperties;
}

const Gradient: React.FC<Props> = ({ resource, style }) => {
  const color = GraphColorLookup[resource];

  return (
    <svg style={{ height: 1, ...style }}>
      <defs>
        <linearGradient id={resource} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.33} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Gradient;

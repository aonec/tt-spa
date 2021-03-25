import React from 'react';
import { ResourceType } from './GraphView';
import { getResourceColor } from '../../../utils/getResourceColor';

interface Props {
  resource: ResourceType;
}

const Gradient: React.FC<Props> = ({ resource }) => {
  const color = getResourceColor(resource);

  return (
    <svg style={{ height: 1 }}>
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

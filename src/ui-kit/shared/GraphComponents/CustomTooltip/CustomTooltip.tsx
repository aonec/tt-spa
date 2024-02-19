import React, { FC } from 'react';
import { CustomTooltipProps } from './CustomTooltip.types';
import { VictoryTooltip } from 'victory';

export const CustomTooltip: FC<CustomTooltipProps> = (props) => {
  const { x, y, active, scale } = props;

  return (
    <g style={{ pointerEvents: 'none' }}>
      {active ? (
        <>
          <line
            x1={x}
            x2={x}
            y1={y}
            y2={scale?.y(0)}
            stroke="#000"
            strokeWidth={0.5}
            strokeDasharray={5}
          />
          <VictoryTooltip {...props} />
          <circle
            cx={x}
            cy={y}
            r={6}
            stroke={'#fff'}
            strokeWidth={2}
            fill="var(--main-100)"
          />
        </>
      ) : null}
    </g>
  );
};

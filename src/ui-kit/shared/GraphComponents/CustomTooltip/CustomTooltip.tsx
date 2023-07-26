import React, { FC } from 'react';
import { CustomTooltipProps } from './CustomTooltip.types';
import { VictoryTooltip } from 'victory';

export const CustomTooltip: FC<CustomTooltipProps> = (props) => {
  const { x, y, active, minValue, maxValue, height, datum } = props;

  if (datum?.value === null || datum?.value === undefined) {
    return null;
  }

  const floor = (Math.abs(maxValue) / (maxValue - minValue)) * height;

  return (
    <g style={{ pointerEvents: 'none' }}>
      {active ? (
        <>
          <line
            transform={`translate(${x}, 0)`}
            x1={0}
            y1={y}
            x2={0}
            y2={floor}
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

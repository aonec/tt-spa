import React, { FC } from 'react';
import { TaskPointProps } from './TaskPoint.types';

export const TaskPoint: FC<TaskPointProps> = ({ scale, datum }) => {
  if (!scale || !datum) {
    return null;
  }
  const { x, y, isEmergency } = datum;

  const xPos = scale.x(x);
  const yPos = scale.y(y);

  return (
    <g>
      <line
        x1={xPos}
        x2={xPos}
        y1={scale.y(0)}
        y2={yPos}
        stroke={'#DCDEE4'}
        stroke-dasharray="5"
      />
      <circle cx={xPos} cy={yPos} r={8} style={{ fill: '#272F5A' }} />
      {isEmergency && (
        <circle
          cx={xPos + 8 * Math.sin(Math.PI / 4)}
          cy={yPos - 8 * Math.sin(Math.PI / 4)}
          r={3}
          style={{ fill: 'red' }}
        />
      )}
    </g>
  );
};

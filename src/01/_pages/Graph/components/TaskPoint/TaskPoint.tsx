import React, { FC, useCallback, useMemo } from 'react';
import { TaskPointProps } from './TaskPoint.types';

const radius = 10;

export const TaskPoint: FC<TaskPointProps> = ({ scale, datum }) => {
  const isAllActive = datum?.isAllActive;

  const style = useMemo(() => {
    const fill = isAllActive ? 'white' : '#272F5A';
    const stroke = isAllActive ? '#272F5A' : '';
    const strokeWidth = isAllActive ? '1' : '';

    return { fill, stroke, strokeWidth };
  }, [isAllActive]);

  const textStyle = useMemo(() => {
    const fill = isAllActive ? '#272F5A' : '#fff';
    const fontSize = '11px';
    return { fill, fontSize };
  }, [isAllActive]);

  if (!scale || !datum) {
    return null;
  }
  const { isEmergency, x, y, amount } = datum;

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
      <circle cx={xPos} cy={yPos} r={radius} style={style} />
      <text x={xPos} y={yPos} dx={-3} dy={4} style={textStyle}>
        {amount}
      </text>
      {isEmergency && (
        <circle
          cx={xPos + radius * Math.sin(Math.PI / 4)}
          cy={yPos - radius * Math.sin(Math.PI / 4)}
          r={4}
          style={{ fill: '#FC525B' }}
        />
      )}
    </g>
  );
};
